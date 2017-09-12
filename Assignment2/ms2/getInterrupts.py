import os
import MySQLdb
import time
import psutil

def connectDB():
    db = MySQLdb.connect(host="mysqlhost",user="root",passwd="root",db="test",port=3306)
    if(db):
        curs = db.cursor()
        return curs,db
        
    else:
        print("Unable to connect to MySQL... Aborting!!")
        sys.exit(0)


def getInterrupts():
	result = psutil.cpu_stats()
	return result[1]

def insertToDB():
	cursor,connection = connectDB()
	query = "create table if not exists Interrupts (i_id int not null auto_increment,value varchar(255),primary key(i_id));"
	cursor.execute(query)
	current_interrupts = getInterrupts()
	print(current_interrupts)
	query = "insert into Interrupts(value) values("+str(current_interrupts)+");"
	cursor.execute(query)
	connection.commit()



if __name__ == '__main__':
	while True:
		insertToDB()
		time.sleep(50)
