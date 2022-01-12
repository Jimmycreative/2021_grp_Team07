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

app = Flask(__name__)
CORS(app)
app.secret_key="OF97y32PdR6bTUsZn89i"

database = mysql.connector.connect(
  host="127.0.0.1",
  user="root",
  password="12345678",
  database="try"
)
login_info = {
    "isLogin": -1,
    "message": "22"
}
algorithm_result = {}

@app.route('/script', methods = ['GET','POST']) #for receiving the data from front end. After front end finish the definition page, api will be created in the frontend.
def get_script():
    if request.method == "GET":
        return algorithm_result
    elif request.method == "POST":
        data = request.json
        if data:
            string = data["data"]
            post_script() #send the data to the algorithm. It should have parameter string, but for testing the connectivity I defined in the post_script

def post_script():

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
    uuid = json.loads(r.text)["data"]
    post_uid(uuid)
    
def post_uid(uuid):

    url = 'http://localhost:8083/home/getres'
    data = {"uuid":uuid}
    r = requests.post(url, data=data)  
    algorithm_result = json.loads(r.text)
    
def modify_info(isLogin,message):
    login_info["isLogin"] = isLogin
    login_info["message"] = message
    print(login_info["message"])
    print(type(login_info))

@app.route('/login', methods = ['GET','POST'])
def test():
    if request.method == 'GET':
        return jsonify({"isLogin":login_info["isLogin"],"message":login_info["message"]})
    elif request.method == 'POST':
        data = request.json
        if data:
            username = data['username']
            password = data['password']
            cur = database.cursor(dictionary=True)
            cur.execute("SELECT uid, displayname, rank, disabled FROM user WHERE username = %s AND password = %s;", (username, password,))
            #cur.execute("SELECT uid, displayname, rank, disabled FROM user WHERE username = '%s' AND password = AES_ENCRYPT('%s', UNHEX(SHA2('injaePleaseLearnFaster', 512)));", credentials)
        account = cur.fetchone()
        if account:
            modify_info(1,"Login successfully!")
        else:   
            modify_info(0,"Login not successful")
        return "login"
    
	

@app.route("/")
def hello_world():
    post_script() #right no it's used to test the connectivity between backend and the algorithm
    return "hello world"


if __name__ == "__main__":
    app.debug = True
    app.run(port=5000)
    
    