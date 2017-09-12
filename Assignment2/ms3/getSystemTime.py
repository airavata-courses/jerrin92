import pika
from datetime import datetime
from time import sleep

def sysTime():
	return datetime.now().strftime('%H:%M:%S')

def sendTime():
	connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbithost'))
	channel = connection.channel()
	channel.queue_declare(queue='channel')

	channel.basic_publish(exchange='',
                      routing_key='channel',
                      body=sysTime())
	print(" [x] Sent 'Current Time'")
	connection.close()

if __name__ == '__main__':
	while True:
		sendTime()
		sleep(5)
