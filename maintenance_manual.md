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
mysql -u <username> -p
```

2. Create a database:

```
    CREATE DATABASE <Insert Your Database Name>;
```
```
Output
Query OK, 1 row affected (0.00 sec)
```
3. Press CTRL+D to exit the MariaDB shell.
4. Place /back-end/grp_structure.sql into the current directory.
5. Execute this in the command prompt/terminal:

```
mysql -u <username> -p <Insert Your Database Name> < grp_structure.sql
```

### Server side




 


### Client side

1. Go to front-end directory and run the following in the terminal:

```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

