import os
import MySQLdb
import time
import psutil

def connectDB():
    db = MySQLdb.connect(host='mysqlhost',user="root",passwd="root",db="test",port=3306)
    if(db):
        curs = db.cursor()
        return curs,db
        
    else:
        print("Unable to connect to MySQL... Aborting!!")
        sys.exit(0)


def getLoadAvg():
	return psutil.cpu_percent()

def insertToDB():
	cursor,connection = connectDB()
	query = "create table if not exists Loads (l_id int not null auto_increment,value varchar(255),primary key(l_id));"
	cursor.execute(query)
	current_load = getLoadAvg()
	print(current_load)
	query = "insert into Loads(value) values("+str(current_load)+");"
	cursor.execute(query)
	connection.commit()



if __name__ == '__main__':
	#blah
	while True:
		insertToDB()
		time.sleep(50)
