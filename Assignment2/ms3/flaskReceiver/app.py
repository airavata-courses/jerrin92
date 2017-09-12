from flask import Flask
from flask_cors import CORS
from time import sleep

import pika

app = Flask(__name__)

def callback(ch, method, properties, body):
    #time = body
    print(" [x] Received %r" % body)


def receiveTime():
	connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbithost'))
	channel = connection.channel()
	channel.queue_declare(queue='channel')
	#channel.basic_consume(callback,
        #              queue='channel',
        #              no_ack=True)
	queue_state = channel.queue_declare('channel', durable=True, passive=True)
	queue_empty = queue_state.method.message_count == 0
	if not queue_empty:
		method, properties, body = channel.basic_get('channel', no_ack=True)
    		callback(channel, method, properties, body)

	return body
	#channel.start_consuming()
	

@app.route("/")
def main():
    time = receiveTime()
    return time

if __name__ == "__main__":
    time = ''
    app.run(host='0.0.0.0',port=5000)
