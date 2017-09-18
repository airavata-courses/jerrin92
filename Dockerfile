# Node.js app Docker file

FROM ubuntu:14.04
MAINTAINER Jerrin Suresh "jerrinsuresh@gmail.com"

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get -qq update
RUN apt-get install -y nodejs npm
#RUN apt-get install -y mysql-server
RUN apt-get install -y libmysqlclient-dev
RUN apt-get install -y python-pip python-dev build-essential
RUN pip install --upgrade pip 
RUN pip install psutil
RUN pip install MySQL-python
RUN pip install flask
RUN pip install flask_cors
RUN pip install pika

# TODO could uninstall some build dependencies

#debian installs `node` as `nodejs`
RUN update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10

#VOLUME ["/nodemon"]

ADD run.sh /
ADD gatway.py /



EXPOSE 5000


#CMD ["/bin/bash"]
CMD ["bash", "run.sh"]
