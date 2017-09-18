from flask import Flask
from flask_cors import CORS, cross_origin
import pika

app = Flask(__name__)
CORS(app)


def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)


def __sendDataRequest(queueName):
	connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbithost'))
	channel = connection.channel()
	channel.queue_declare(queue=queueName)
	channel.basic_publish(exchange='',
                      routing_key=queueName,
                      body='Send Data')
	print(" [x] Sent 'Data Request!'")
	connection.close()

def __getDataFromRabbitMQ(queueName):
	connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbithost'))
	channel = connection.channel()
	channel.queue_declare(queue=queueName)
	queue_state = channel.queue_declare(queueName, durable=True, passive=True)
	queue_empty = queue_state.method.message_count == 0
	if not queue_empty:
		method, properties, res = channel.basic_get(queueName, no_ack=True)
		callback(channel, method, properties, res)
	return res


@app.route('/')
@cross_origin()
def index():
    return 'Gateway is here'

@app.route('/load')
def load():
	#Read from RabbitMQ load queue
	__sendDataRequest('load-request')
	data = __getDataFromRabbitMQ('load')

	#Retrun the data as a json object
	return data


@app.route('/interrupt')
def interrupt():
	#Read from RabbitMQ interrupts queue
	__sendDataRequest('interrupt-request')
	data = __getDataFromRabbitMQ('interrupt')
	#Return the data as a json object
	return data

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000)
