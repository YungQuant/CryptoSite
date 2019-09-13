import asyncio
import websockets
import json
import pandas as pd
import numpy as np

loop = asyncio.get_event_loop()

books = {}
outgrid = {}
xticks = {}

sync = False


async def adjust_xvals(symbol, bids, asks, mm=12):
    bids = [uu[1] for uu in bids]
    asks = [uu[1] for uu in asks]
    a, b = np.min(bids), np.max(asks)
    dx = (b - a) / (mm-1)
    return ['${0:.2f}'.format((a + i*dx)) if symbol in ['XBTUSD'] else '{0:.8f}'.format(a+i*dx) for i in range(mm)]

async def sendbook(conn, books, tick_limit=50, depth_limit=30):
    global outgrid

    vv = 12

    for u, v in books.items():
        bids, asks = books[u]['Bids'].sort_values(by='PRICE', ascending=True).values[:tick_limit], books[u]['Asks'].sort_values(by='PRICE', ascending=True).values[:tick_limit]
        cbids = [np.sum([uu[1]*uu[2] for uu in bids[:mm]])/1000 for mm in range(len(bids))]
        casks = [np.sum([uu[1]*uu[2] for uu in asks[:mm]])/1000 for mm in range(len(asks))]
        outgrid[u].append(list(reversed(cbids)) + casks)
        xticks[u] = await adjust_xvals(u, bids, asks, mm=vv)
        if len(outgrid[u]) > depth_limit + 10:
            outgrid[u] = outgrid[u][10:]

    a, b, n = 0, tick_limit + 10, vv
    dx = (b - a) / (n - 1)
    tickvals = [a + i*dx for i in range(n)]

    for ticker, meshgrider in outgrid.items():
        print('Sending message size: {} | Subscribed to : {}; {}'.format(len(meshgrider), len(outgrid.keys()), outgrid.keys()), end='\n\n')
        #if ticker in ['XBTUSD','ETHUSD','LTCM19','XRPM19','ADAM19','EOSM19','XBT7D_U105','TRXM19','BCHM19']:
        await conn.send(json.dumps({'Symbol':ticker, 'X': xticks[ticker], 'Data':meshgrider, 'TV': list(reversed(tickvals))}))
        await asyncio.sleep(10)

async def parse(msg):
    global outgrid
    global books
    global sync

    if 'action' in msg.keys():
        action = msg['action']
        data = msg['data']
        if action == 'partial':
            outgrid = {i:[] for i in list(set([i['symbol'] for i in data]))}
            bids = {i:[] for i in list(set([i['symbol'] for i in data]))}
            asks = {i:[] for i in list(set([i['symbol'] for i in data]))}
            for i in data:
                symbol, side, price, size, oid = [float(i[l]) if k == 2 or k == 3 else i[l] for k, l in enumerate(('symbol','side','price','size','id'))]
                if side == 'Buy':
                    bids[symbol].append([oid, price, size])
                else:
                    asks[symbol].append([oid, price, size])
            books = {hh:{'Bids':pd.DataFrame(data=bids[hh], columns=['ID','PRICE','SIZE']), 'Asks':pd.DataFrame(data=asks[hh], columns=['ID','PRICE','SIZE'])} for hh in bids.keys()}
            bids = asks = None
        elif action == 'insert':
            bids = {i:[] for i in list(set([i['symbol'] for i in data]))}
            asks = bids
            for i in data:
                symbol, side, price, size, oid = [float(i[l]) if k == 2 or k == 3 else i[l] for k, l in enumerate(('symbol','side','price','size','id'))]
                if side == 'Buy':
                    bids[symbol].append([oid, price, size])
                else:
                    asks[symbol].append([oid, price, size])
            for uu in bids.keys():
                books[uu]['Bids'].append(pd.DataFrame(data=bids[uu])); books[uu]['Asks'].append(pd.DataFrame(data=asks[uu]))
        elif action == 'delete':
            for i in data:
                order_id, side, symbol = i['id'], i['side'], i['symbol']
                if side == 'Buy':
                    dt = books[symbol]['Bids']
                    dt = dt[dt.ID != order_id]
                    books[symbol]['Bids'] = dt
                else:
                    dt = books[symbol]['Asks']
                    dt = dt[dt.ID != order_id]
                    books[symbol]['Asks'] = dt
        elif action == 'update':
            for i in data:
                order_id, side, symbol, size = i['id'], i['side'], i['symbol'], i['size']
                if side == 'Buy':
                    ids = books[symbol]['Bids']['ID'].tolist().index(order_id)
                    books[symbol]['Bids']['SIZE'][ids] = float(size)
                else:
                    ids = books[symbol]['Asks']['ID'].tolist().index(order_id)
                    books[symbol]['Asks']['SIZE'][ids] = float(size)
        else:
            pass
        sync = True

async def start(conn, path):
    global sync
    print('Connected to BitMEX Socket')
    async with websockets.connect('wss://www.bitmex.com/realtime?subscribe=orderBookL2_25:XBTUSD') as ws:
        while True:
            try:
                resp = json.loads(await ws.recv())
                await parse(resp)
                if sync:
                    await sendbook(conn, books)
                    await asyncio.sleep(10)
            except Exception as e:
                print('Error: {}'.format(e))
                



def connect(host='127.0.0.1', port='5678'):
    server = websockets.serve(start, host, port)
    loop.run_until_complete(server)
    loop.run_forever()


connect()
