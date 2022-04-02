# Maintenance Manual

## Environment requirements

- Windows 7 or Newer
- Node.js 12.22.2
- Python 3.8.10 
- Flask 2.0.2 
- Google OR-tool 9.2. 9972
- MySQL 5.0.2
- JDK 8 
- IntelliJ IDEA Community Edition 2021.3.3

## Setup instructions 

### Database
You can skip this step if you are running this on the University of Nottingham Ningbo China School network.
1. Download MySQL 5.0.2 or MariaDB 10.4.24 (https://mariadb.org/download/) and follow installation instructions.
2. Add installation directory to root if necessary. (Check environmental variables)
3. Log in as root or any user with database creation and table creation privileges:
  ```cmd
  mysql -u root -p
  ```

4. Create a database:
  ```sql
  CREATE DATABASE cimpo;
  ```
  The following will be the expected output:  
  ```
  Output
  Query OK, 1 row affected (0.0012 sec)
  ```
  
5. Run this in the MySQL shell:
    ```sql
    source grp_structure.sql
    ```
    
6. Create a manager account:
  ```sql
  INSERT INTO user (username, displayname, password, rank)
  VALUES ("username", "displayname", "password", 1);
  ```
  
8. Exit the MySQL shell:
    ```
    \q
    ```
    
7. Start the MySQL service:
    ```
    mysqld
    ```

The database is now successfully imported and launched.  
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
    - Install flask-cors (`pip install flask-cors`)
    - Install Requests (`pip install requests`)
    - Install SQLAlchemy (`pip install sqlalchemy`)
    
3. Make sure MySQL/MariaDB server is running (See above section)
4. Configure database settings in main.py:
  ```py
  database = mysql.connector.connect(
      host="mysql server address", # host="127.0.0.1" for localhost
      port=3306,
      user="dbms username",
      database="cimpo",
      password="dbms user password",
  )
  ```
  - A database is set up in the UNNC LAN. If you are on UNNC, you are advised to use:
  ```py
  database = mysql.connector.connect(
  host="10.6.2.51",
  user="Team202107",
  database="Team202107",
  password="Team202107",
  )
  ```
5. Go to back-end directory and execute main.py (`python main.py`)  
 
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

1. Install JDK 8
2. Install IntelliJ IDEA Community Edition 2021.3.3
3. Choose **script\magicProject** as the root directory in IntelliJ
4. Go to `File > Project Structure > Project` and select `1.8 Oracle OpenJDK version 1.8.0_321` for SDK, and select `8-Lambdas, type annotations etc,` for Language level. Next go to `Project Structure > Project` and select `8-Lambdas, type annotations etc,` for Language level.
5. Open **magicProject\src\main\resources\application-dev.yml** and add the following for url:
```
jdbc:mysql://127.0.0.1:3306/cimpo?useUnicode=true&characterEncoding=utf-8&serverTimezone=UTC
```
9. Open **magicProject\src\main\java\com.grp\UtilApplication** and run the program


