# You should not import any additional modules
# You can, however, import additional functionalities 
# from the flask and sqlite3 modules
import sys
from click.types import convert_type
from flask import Flask, render_template, request, redirect, session, url_for, flash
import mysql.connector
import sys
from flask import jsonify 
from flask_cors import CORS
import json
import requests
import secrets
import string

app = Flask(__name__)
CORS(app)
#app.secret_key="OF97y32PdR6bTUsZn89i"

database = mysql.connector.connect(
  host="127.0.0.1",
  user="root",
  password="12345678",
  database="try"
)
login_info = {
    "code": -1,
    "message": ""
}
algorithm_result = {}

#Below three functions are helper function
# For generating token
def tokengen():
    purgetoken()
    token = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(8))
    while checktoken(token):
        token = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(8))
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

#for checking token exists
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

def modify_info(isLogin,message):
    login_info["isLogin"] = isLogin
    login_info["message"] = message
    print(login_info["message"])
    print(type(login_info))

def modify_token(uses,token):
    cur = database.cursor()
    cur.execute("UPDATE token SET uses= (%s - 1) WHERE token = %s;", (uses,token))
    database.commit()
    
            
#Below for api
@app.route('/getuuid', methods = ['POST']) #for receiving the data from front end. After front end finish the definition page, api will be created in the frontend.
def get_script():
    
        data = request.json
        if data:
            string = data["data"]
            uuid = post_script(string) #send the data to the algorithm. It should have parameter string, but for testing the connectivity I defined in the post_script
            return uuid
def post_script(string): #string will replace the variable s below

    url = 'http://localhost:8083/home/getuuid' 
    s = '''
        job1=[[0, 3, 0], [1, 2, 1], [2, 2, 1]]
        job2=[[0, 2, 0], [12, 1, 1], [1, 4, 2]]
        job3=[[1, 4, 0], [2, 3, 1]]
        jobs=[job1,job2,job3]
        expected_duration=[15,15,10]
        machine_count = {'0':2,'1':1,'2':2}
        job_names=["0","1", "2"]
        //return minimize;
        //model.runFlexible(jobs,machine_count)
        //model.runDynamic(jobs,expected_duration)
        //model.runMulti(jobs)
        return model.runBasic(jobs)
        '''
    data = {"code":s}
    r = requests.post(url, data=data)  
    uuid = json.loads(r.text)
    return uuid
@app.route('/getres', methods = ['POST'])
def post_uid():
    data = request.json
    if data:
        url = 'http://localhost:8083/home/getres'
        pass_data = {"uuid":data["data"]}
        r = requests.post(url, data=pass_data)  
        algorithm_result = json.loads(r.text)
        return algorithm_result

@app.route('/getAllSchedules', methods = ['POST'])
def getAllSchedule():
    data = request.json
    if data:
        skip_schedule = data["skipschedule"]
        cur = database.cursor(dictionary=True)
        cur.execute("SELECT * FROM schedule ORDER BY startdate DESC LIMIT (%d,%d);",(skip_schedule,skip_schedule+20))
    schedules = cur.fetchone()
    if schedules:
        return jsonify({"code":1, "data":schedules,"message":"Successfully get the schedules!"})
    else:   
        
        return jsonify({"code":-1, "data":{},"message":"Fail to get the schedules!"})

    

@app.route('/saveSchedule', methods = ['POST'])
def save_schedule():
    data = request.json
    
    if data:
        cur = database.cursor(dictionary=True)
        name = data["data"]["name"]
        uid = data["data"]["uid"]
        script = data["data"]["script"]
        timelength = data["data"]["timelength"]
        result = data["data"]["result"]
        status = data["data"]["status"]
        errlog = data["data"]["errlog"]
        description = data["data"]["description"]
        uuid = data["data"]["uuid"]
        cur.execute("INSERT INTO schedule (name, uid, script, timelength, result, status, errlog, description, uuid) VALUES ( %s, %d, %s, %d, %s, %d, %s, %s, %s);", (name, uid, script, timelength, result, status, errlog, description, uuid))
        #INSERT INTO schedule (name, uid, script, timelength, result, status, errlog, description, uuid) VALUES ('schedule 1',1,'i am handsome',3,'[{"name":"Maachine_0","tasklist":[{"task_name":"task_0","to_time":3,"from_time":0}]},{"name":"Maachine_1","tasklist":[{"task_name":"task_0","to_time":1,"from_time":0}]}]', -1, "none",'good schedule','8jug7g7g')
        database.commit()


@app.route('/login', methods = ['POST'])
def test():
   
        data = request.json
        if data:
            print(data)
            username = data['username']
            password = data['password']
            cur = database.cursor(dictionary=True)
            cur.execute("SELECT username, password FROM user WHERE username = %s AND password = %s;", (username, password))
            #cur.execute("SELECT uid, displayname, rank, disabled FROM user WHERE username = %s AND password = %s;", (username, password,))
            #cur.execute("SELECT uid, displayname, rank, disabled FROM user WHERE username = %s AND password = AES_ENCRYPT(%s, UNHEX(SHA2('', )));", (username, password,))
            
        account = cur.fetchone()
        database.commit()
        if account:
            modify_info(1,"Login successfully!")
        else:   
            modify_info(0,"Login not successful")
        return jsonify({"code":login_info["isLogin"],"message":login_info["message"]})
    
#registration page
@app.route('/registration', methods = ['POST'])
def registration():
    
    json_data = request.json

    if json_data:
        #check token in db
        tokendata = checktoken(json_data["data"]["token"])
        if tokendata:
            if checkusername(json_data["data"]["username"]):
                #modify the uses times
                uses = tokendata['uses']
                modify_token(uses,tokendata) 
                #store the user in the database
                cur = database.cursor()
                username = json_data["data"]["username"]
                displayname = json_data["data"]["displayname"]
                password = json_data["data"]["password"]
                cur.execute("SELECT ranks FROM token WHERE token = %s;", (tokendata))
                rank = cur.fetchone()["ranks"]
                database.commit()
                
                cur.execute("""
                INSERT INTO user (username, displayname, password, rank)
                VALUES (%s, %s, %s, %s);
                """, (username, displayname, password, rank,)) ##CHANGE2022-01-15
                database.commit()
                return jsonify({"code":1,"message":"Succesfully register."})
            else:
                return jsonify({"code":0,"message":"Username already exist."})
            
        else:
            #tokendata not exist/wrong pass
            err = "This token is invalid."
            return jsonify({"code":-1,"message":err})


@app.route('/genToken', methods = ['POST']) #for getting the token from the manager
def genToken():
    json_data = request.json
    if json_data:
        
        dateexpire = json_data["data"]["dateexpire"]
        rank = json_data["data"]["rank"] # 0 for planner 1 for manager
        uses = json_data["data"]["uses"]
        
        token = tokengen()
        if token is None:
            return jsonify({"code":-1,"data":"","message":"Not successfully generating token!"})
        else:
            puttoken(token,dateexpire,rank,uses)
            return jsonify({"code":1,"data":token,"message":"Successfully generating token!"})
        
      



@app.route("/")
def hello_world():
    post_script() #right no it's used to test the connectivity between backend and the algorithm
    return "hello world"


if __name__ == "__main__":
    app.debug = True
    app.run(port=5000)
    
    
