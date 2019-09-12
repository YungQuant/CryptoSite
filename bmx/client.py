import socket
import sys

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
addy = ('localhost', 8888)
sock.connect(addy)

try:


    while True:
        data = sock.recv(1024)
        print(data)

finally:
    print >>sys.stderr, 'closing socket'
    sock.close()
