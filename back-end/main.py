# You should not import any additional modules
# You can, however, import additional functionalities 
# from the flask and sqlite3 modules
from flask import Flask, render_template, request, redirect, session, url_for, flash
import mysql.connector

app = Flask(__name__)
app.secret_key="OF97y32PdR6bTUsZn89i"

database = mysql.connector.connect(
  host="192.168.0.108",
  user="team_202107",
  password="d7pGAvn05YWVwdgR",
  database="unnc_team_2021-07-p16"
)

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
    
    cur = database.cursor(dictionary=True)
    cur.execute("SELECT uid, displayname, rank, disabled FROM user WHERE username = %s AND password = %s;", (username, password,))
    #cur.execute("SELECT uid, displayname, rank, disabled FROM user WHERE username = '%s' AND password = AES_ENCRYPT('%s', UNHEX(SHA2('injaePleaseLearnFaster', 512)));", credentials)
    
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
    session['displayname'] = account['displayname']

    cur.execute("INSERT INTO accesslog (uid, ip) VALUES (%s, %s);", (account['uid'], ipaddress))
    database.commit()

    return redirect(url_for('home'))
    
@app.route('/home')
def home():
    return render_template('home/index.html')

if __name__ == "__main__":
    app.debug = True
    app.run(port=5000)
    