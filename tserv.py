import asyncio
import websockets
import time
import json

async def start(ws, path):
    while True:
        await ws.send(json.dumps({'Symbol':'TEST','Data':int(time.time()*1000)}))
        await asyncio.sleep(1.3)        

loop = asyncio.get_event_loop()
loop.run_until_complete(websockets.serve(start, 'localhost', 5678))
loop.run_forever()
