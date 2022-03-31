# Maintenance Manual

## Environment requirements

- Windows 7 or newer 
- React 18.0.0 
- Node.js 16.13.2
- Python 3.7.3 
- Flask 2.0.2 
- Java 17.0.2 
- MariaDB 10.4.14

## Setup instructions 
### Database
1. Install MariaDB (https://mariadb.org/download/).
2. Log in as root or any user with database creation and table creation privileges:

```
mysql -u root -p
```

3. Create a database:

```
    CREATE DATABASE cimpo;
```
```
Output
Query OK, 1 row affected (0.00 sec)
```
4. Press CTRL+D to exit the MariaDB shell.
5. Place /back-end/grp_structure.sql into the current directory.
6. Execute this in the command prompt/terminal:

```
mysql -u <username> -p cimpo < grp_structure.sql
```

The database is now successfully imported.

## Back end server

1. Install Python 3.7.3


 


### Client side

1. Go to front-end directory and run the following in the terminal:

```
npm start
```
Runs the app in the development mode.\

2. Open [http://localhost:3000](http://localhost:3000) in your browser.
