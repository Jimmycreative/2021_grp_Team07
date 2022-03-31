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

1. Log in as root or any user with database creation and table creation privileges:

```
mysql -u root -p
```

2. Create a database:

```
    CREATE DATABASE <Insert Your Database Name>;
```
```
Output
Query OK, 1 row affected (0.00 sec)
```
Press CTRL+D to exit the MariaDB shell.

```
mysql -u username -p new_database < data-dump.sql
```
username is the username you can log in to the database with
newdatabase is the name of the freshly created database
data-dump.sql is the data dump file to be imported, located in the current directory


### Server side




 


### Client side

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
