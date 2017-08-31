# System Load Stats



System Requirements
  * Python 2.7
  * Node ^8.1.2 (https://nodejs.org/en/download/)
  * MySQL ^14.14 (https://dev.mysql.com/doc/refman/5.5/en/linux-installation.html)
  * Angular ^2.4 (https://www.npmjs.com/package/angular)
  * npm ^5.3.0 (https://docs.npmjs.com/getting-started/installing-node)
  * Express ^4.15.0 (npm install -g express && npm install express-generator -g)
  
Python required pacakges
  * MySQLdb (https://stackoverflow.com/questions/25865270/how-to-install-python-mysqldb-module-using-pip)
  * psutil (pip install psutil)
 

Building and Running the system
  * Start the MySQL service
  * Edit the getLoad.py & getInterrupts.py and enter the login credentials and ensure that test database exists in MySQL
  * Run both the python scripts
  * In the userInterface directory run command 'npm install' followed by 'ng serve'
  * Edit the database credentials in app.js in both nodemon & nodemon2 directories
  * In the nodemon & nodemon2 directories run 'npm install' followed by 'node app.js'
  * Open a webbrowser and visit http://localhost:4200






