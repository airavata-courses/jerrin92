# Node.js app Docker file

FROM ubuntu:14.04
MAINTAINER Jerrin Suresh "jerrinsuresh@gmail.com"

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get -qq update
#RUN apt-get install -y nodejs npm
#RUN apt-get install -y mysql-server
RUN apt-get install -y libmysqlclient-dev
RUN apt-get install -y python-pip python-dev build-essential
RUN pip install --upgrade pip 
RUN pip install psutil
RUN pip install pika
RUN pip install flask
RUN pip install flask_cors

# TODO could uninstall some build dependencies

ADD run.sh /
ADD flaskReceiver /flaskReceiver
ADD getSystemTime.py /


EXPOSE 5000


#CMD ["/bin/bash"]
CMD ["bash", "run.sh"]
