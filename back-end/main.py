# You should not import any additional modules
# You can, however, import additional functionalities 
# from the flask and sqlite3 modules
import json
from flask import Flask, render_template, request, redirect, session, url_for
#from flask_session import Session
import mysql.connector
import secrets
import string

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
    tokengen()
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
    else:
        err = "Error in processing your input."
        return render_template("index.html", msg=err, error=1)
    
    cur = database.cursor(dictionary=True)
    cur.execute("SELECT uid, displayname, rank, disabled FROM user WHERE username = %s AND password = %s;", (username, password,))
    #cur.execute("SELECT uid, displayname, rank, disabled FROM user WHERE username = %s AND password = AES_ENCRYPT(%s, UNHEX(SHA2('injaePleaseLearnFaster', 512)));", (username, password,))
    
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
    

    if checktoken(usertoken):
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
        #if displayname is not filled in, set displayname to username
        if 'displayname' in request.form:
            displayname = request.form['displayname']
        else:
            displayname = username
        
        password = request.form['password']
        usertoken = request.form['token']
    else:
        err = "Error in processing your input."
        return render_template('registration/index.html', msg=err, error=1)


    #check if username already exists
    #this is a failsafe, please do this in frontend first
    if checkusername(username):
        err = "Username already exists"
        return render_template('registration/index.html', msg=err, error=1, token=usertoken)

    #else check token in db
    tokendata = checktoken(usertoken)
    uses = tokendata['uses']
    #successful
    if tokendata:
        cur = database.cursor()
        cur.execute("UPDATE token SET uses= (%s - 1) WHERE token = %s;", (uses, usertoken,))
        database.commit()
        '''
        cur.execute("""
        INSERT INTO user (username, displayname, password)
        VALUES (%s, %s, AES_ENCRYPT(%s, UNHEX(SHA2('injaePleaseLearnFaster', 512))));
        """, (username, displayname, password,))
        '''
        cur.execute("""
        INSERT INTO user (username, displayname, password)
        VALUES (%s, %s, %s);
        """, (username, displayname, password,))
        database.commit()
        
        
        return redirect(url_for('index'))
    #token not found
    else:
        return render_template("token/index.html")



# IMPORTANT!! FOR FRONTEND:
## BELOW IS CODE TO CHECK IF USERNAME ALREADY EXISTS IN DATABASE!!\
##PLEASE ADD A BUTTON TO CHECK IF USERNAME EXISTS NEXT TO THE TEXTBOX FOR USERNAME INPUT
##PLEASE VERIFY WHETHER USERNAME IS VALID BEFORE USING THIS CODE!

#username requriements before feeding to this program:
# 4-16 characters, first must be A-Za-z, last must be A-Za-z0-9, middle [A-Za-z0-9_] 
# regex to check is below
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


##for checking token exists
def checktoken(token):
    cur = database.cursor(dictionary=True)
    cur.execute("""
    SELECT uses, rank
    FROM token
    WHERE token = %s
    AND disabled = 0
    AND (dateexpire IS NULL OR dateexpire > CURRENT_TIMESTAMP()) 
    AND uses <> 0;
    """, (token,))

    tokendata = cur.fetchone()

    return tokendata

#for putting into database
## REQUIREMENTS
## dateexpire must be in format "YYYY-MM-DD hh:mm:ss", if set to "never expire", put None
## uses must be integer, if set to unlimited uses, put -1 or None

## rank guide
### 0 = user
### 1 = planner
### 2 = manager
def puttoken(token, dateexpire, rank, uses):
    cur = database.cursor()
    if token is None:
        token = tokengen()
    if rank is None:
        rank = 0
    if uses is None:
        uses = -1

    if dateexpire is None:
        cur.execute("""
        INSERT INTO token (token, dateexpire, rank, uses)
        VALUES (%s, NULL, %s, %s);
        """, (token, rank, uses))
    else:
        cur.execute("""
        INSERT INTO token (token, dateexpire, rank, uses)
        VALUES (%s, %s, %s, %s);
        """, (token, dateexpire, rank, uses))

    database.commit()
    
    

# For generating token
def tokengen():
    token = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(8))
    flag=False

    while checktoken(token):
        if flag:
            purgetoken()
        token = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(8))
        flag=True

    return token

#for purging invalid tokens
def purgetoken():
    cur = database.cursor()
    cur.execute("""
    DELETE FROM token
    WHERE disabled = 1
    OR dateexpire < CURRENT_TIMESTAMP()
    OR uses = 0;
    """)
    database.commit()


@app.route('/home')
def home():
    return render_template('home/index.html')

if __name__ == "__main__":
    app.debug = True
    app.run(port=5000)
    