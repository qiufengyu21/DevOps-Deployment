import BaseHTTPServer
import time
import sys
import random
import redis


HOST_NAME = '' # !!!REMEMBER TO CHANGE THIS!!!
PORT_NUMBER = 8080 # Maybe set this to 9000.

PROD = None
STAGING = None
r = redis.Redis()

class RedirectHandler(BaseHTTPServer.BaseHTTPRequestHandler):
    def do_HEAD(s):
        s.send_response(301)

	r = random.uniform(0,1)
	if r < 0.5:
		print "sending to prod:", PROD
		s.send_header("Location", "http://"+PROD)
	else:
		if r.get('flag') == '1':
			print "sending to staging:", STAGING
			s.send_header("Location", "http://"+STAGING)
		else:
			print "staging flag: FALSE, sending to PROD:", PROD
			s.send_header("Location", "http://"+PROD)

        s.end_headers()
    def do_GET(s):
        s.do_HEAD()

if __name__ == '__main__':
    PROD = sys.argv[1]
    STAGING = sys.argv[2]
    server_class = BaseHTTPServer.HTTPServer
    httpd = server_class((HOST_NAME, PORT_NUMBER), RedirectHandler)
    #print time.asctime(), "Server Starts - %s:%s" % (HOST_NAME, PORT_NUMBER)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    #print time.asctime(), "Server Stops - %s:%s" % (HOST_NAME, PORT_NUMBER)
