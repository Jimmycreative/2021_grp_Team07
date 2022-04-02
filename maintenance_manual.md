# Maintenance Manual

## Environment requirements

- Windows 7 or Newer
- Node.js 12.22.2
- Python 3.8.10 
- Flask 2.0.2 
- Java 1.8 
- MySQL 5.0.2
- Google OR-tool 9.2. 9972
- IntelliJ IDEA 2021.3

## Setup instructions 
### Database
1. Download MySQL 5.0.2 or MariaDB 10.4.24 (https://mariadb.org/download/) and follow installation instructions.
2. Log in as root or any user with database creation and table creation privileges:
    - MariaDB
    ```cmd
    mysqlsh -u root -p
    ```
    - MySQL
    ```cmd
    mysql -u root -p
    ```

3. Switch shell to SQL mode:
    ```
    \sql
    ```
5. Create a database:

```sql
    CREATE DATABASE cimpo;
```
The following will be the expected output:
```
Output
Query OK, 1 row affected (0.00 sec)
```
4. Press CTRL+D to exit the MariaDB shell.
5. Place /back-end/grp_structure.sql into the current directory.
6. Execute this in the command prompt/terminal:

```cmd
mysql -u "username" -p < grp_structure.sql
```

The database is now successfully imported.  
If the MySQL server is not on the same LAN as the back end server, please make sure you have configured port forwarding properly.  
The default port for MySQL is 3306.  

### Back end server

1. Install Python 3.8.10 
2. Install Python dependancies:  
  - **Windows Users:**  
    - Run py-dependancies.bat
  - **Other OS:**  
    - Install Flask 2.0.2 (`pip install flask`)
    - Install latest version of MySQL Connector/Python (`pip install mysql-connector-python`)
    - Install flask_session (`pip install flask-session`)
    - Install Google OR-tool 9.2. 9972 (`pip install --upgrade --user ortools`)

3. Install all other dependancies
4. Make sure MySQL/MariaDB server is running (See above section)
5. Configure database settings in main.py:
```py
database = mysql.connector.connect(
    host="mysql server address",
    user="dbms username",
    database="cimpo",
    password="dbms user password",
)
```
6. Go to back-end directory and execute main.py (`python main.py`)  
 
 The back end server is now running on port 5000.   
 To change the port the server is running on, go to the last line of `main.py` and change the port here:
 ```py
 app.run(port=5000)
 ```
If the back end server is not on the same LAN as the front end server, please make sure you have configured port forwarding properly.  

### Front end

1. Install Node.js 12.22.2
2. Go to front-end directory and run (`npm install`) in the terminal
3. In the same directory, run (`npm start`) in the terminal
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Script language

1. Install IntelliJ IDEA 2021.3
2. Maven......
3. ......
4. ......

