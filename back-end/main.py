# You should not import any additional modules
# You can, however, import additional functionalities 
# from the flask and sqlite3 modules
from flask import Flask, render_template, request, redirect, session, url_for
#from flask_session import Session
import mysql.connector

app = Flask(__name__)
app.secret_key="OF97y32PdR6bTUsZn89i"
#app.config.from_object(__name__)
#Session(app)

database = mysql.connector.connect(
  host="192.168.0.108",
  user="team_202107",
  password="d7pGAvn05YWVwdgR",
  database="unnc_team_2021-07-p16"
)

#login main
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/', methods = ['POST'])
def login():
    if request.method != 'POST':
        err = "This method is not supported."
        return render_template("index.html", msg=err, error=1)
    # Check if "username" and "password" POST requests exist (user submitted form)
    if 'username' in request.form and 'password' in request.form:
        # Create variables for easy access
        username = request.form['username']
        password = request.form['password']
        ipaddress = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    else:
        err = "Error in processing your input."
        return render_template("index.html", msg=err, error=1)
    
    cur = database.cursor(dictionary=True)
    #cur.execute("SELECT uid, displayname, rank, disabled FROM user WHERE username = %s AND password = %s;", (username, password,))
    cur.execute("SELECT uid, displayname, rank, disabled FROM user WHERE username = %s AND password = AES_ENCRYPT(%s, UNHEX(SHA2('injaePleaseLearnFaster', 512)));", (username, password,))
    
    account = cur.fetchone()

    if account:
        if account['disabled'] != 0:
            #account has been disabled
            err = "Your account is disabled. Please contact your system administrator."
            return render_template("index.html", msg=err, error=1)
    else:
        #account not exist/wrong pass
        err = "Login information is not correct."
        return render_template("index.html", msg=err, error=1)
    
    session['uid'] = account['uid']
    session['username']= username
    session['displayname'] = account['displayname']

    cur.execute("INSERT INTO accesslog (uid, ip) VALUES (%s, %s);", (account['uid'], ipaddress))
    database.commit()

    return redirect(url_for('home'))

   
#registration page
@app.route('/registration/', methods = ['GET'])
def registration():
    if request.method != 'GET':
        #if method is not get, tell user to go home
        return render_template('token/index.html')
    else:
        #set local variable from get token
        usertoken = request.args.get('token', None)

    if usertoken is None:
        #if token is not defined in get, return page to ask token
        return render_template('token/index.html')

    #else check token in db
    cur = database.cursor(dictionary=True)
    cur.execute("""
    SELECT token
    FROM tokens
    WHERE token = %s
    AND disabled = 0
    AND (dateexpire IS NULL OR dateexpire > CURRENT_TIMESTAMP()) 
    AND uses > 0;
    """, (usertoken,))

    tokendata = cur.fetchone()

    if tokendata:
        #if valid token is found, return real registration page
        return redirect(url_for('registrationform', **request.args))
        
    else:
        #tokendata not exist/wrong pass
        err = "This token is invalid."
        #return ask token again
        return render_template("token/index.html", msg=err, error=1)




@app.route('/registration/form', methods = ['GET'])
def registrationform():
    if request.args.get('token', None) is None:
        return redirect(url_for(registration))
    else:
        return render_template('registration/index.html')

@app.route('/registration/form', methods = ['POST'])
def registrationpost():
    if request.method != 'POST':
        return render_template('registration/index.html')
    # Check if "username" and "password" POST requests exist (user submitted form)
    
    if 'username' in request.form and 'password' in request.form:
        # Create variables for easy access
        username = request.form['username']
        if 'displayname' in request.form:
            displayname = request.form['displayname']
        else:
            displayname = username
        password = request.form['password']
        usertoken = request.form['token']
        ipaddress = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    else:
        err = "Error in processing your input."
        return render_template('registration/index.html', msg=err, error=1)


    #check if username already exists
    if checkusername(username):
        err = "Username already exists"
        return render_template('registration/index.html', msg=err, error=1)

    #else check token in db
    cur = database.cursor(dictionary=True)
    cur.execute("""
    SELECT uses
    FROM tokens
    WHERE token = %s
    AND disabled = 0
    AND (dateexpire IS NULL OR dateexpire > CURRENT_TIMESTAMP()) 
    AND uses > 0;
    """, (usertoken,))

    tokendata = cur.fetchone()

    if tokendata:
        cur.execute("""
        UPDATE tokens
        SET uses = %s-1
        WHERE token = %s;
        """, (tokendata['uses'], usertoken,))

        cur.execute("""
        INSERT INTO user (username, displayname, password)
        VALUES (%s, %s, AES_ENCRYPT(%s, UNHEX(SHA2('injaePleaseLearnFaster', 512))))
        """, (username, displayname, password,))

        database.commit()

        cur.execute("""
        INSERT INTO accesslog (uid, ip, action)
        VALUES ((SELECT uid FROM user WHERE username = %s), ipaddress, 1);
        """)
        
        return redirect(url_for('index'))


# IMPORTANT!! FOR FRONTEND:
## BELOW IS CODE TO CHECK IF USERNAME ALREADY EXISTS IN DATABASE!!\
##PLEASE ADD A BUTTON TO CHECK IF USERNAME EXISTS NEXT TO THE TEXTBOX FOR USERNAME INPUT
##PLEASE VERIFY WHETHER USERNAME IS VALID BEFORE USING THIS CODE!

#username requriements before feeding to this program:
# 3-16 characters, first must be A-Za-z, last must be A-Za-z0-9, middle [A-Za-z0-9_] 
# regex is below
# ^[A-Za-z][\w]{2,14}[A-Za-z0-9]$

def checkusername(username):
    cur = database.cursor()
    cur.execute("""
    SELECT username
    FROM user
    WHERE username = %s
    """, (username,))

    userexist = cur.fetchone()

    if userexist:
        return True
    else:
        return False




@app.route('/home')
def home():
    return render_template('home/index.html')

if __name__ == "__main__":
    app.debug = True
    app.run(port=5000)
    