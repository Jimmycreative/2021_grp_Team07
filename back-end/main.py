# You should not import any additional modules
# You can, however, import additional functionalities
# from the flask and sqlite3 modules
from click.types import convert_type
from flask import Flask, render_template, request, redirect, session, url_for, flash
import mysql.connector
import sys
from flask import jsonify
from flask_cors import CORS, cross_origin
import json
import requests
import secrets
import string
import datetime
import json
import decimal


class MyEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, bytearray):  # 返回内容如果包含bytearray类型的数据
            return str(obj, encoding='utf-8')
        elif isinstance(obj, bytes):
            return str(obj, encoding='utf-8')
        elif isinstance(obj, datetime.datetime):  # 返回内容如果包含datetime类型的数据
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, decimal.Decimal):  # 返回内容如果包含Decimal类型的数据
            return float(obj)
        super(MyEncoder, self).default(obj)

        return json.JSONEncoder.default(self, obj)


app = Flask(__name__)
CORS(app, supports_credentials=True)

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


# Below three functions are helper function
def handle_result(result):
    res = []
    dic = {}
    i = 0

    while True:
        if i == len(result):
            break
        elif result[i] == "{":
            key = ""
            value = ""
            i += 1
            while True:
                if (result[i] == "," and result[i-1] == "}") or (result[i] == "}" and result[i-1] == "]"):
                    break
                elif result[i] == "," or result[i] == "}":
                    i += 1
                elif result[i] == "'":
                    i += 1
                    while True:
                        if result[i] == "'":
                            i += 1
                            break
                        else:
                            key += result[i]
                            i += 1
                elif result[i] == ":":
                    if key == "start":
                        i += 1
                        while True:
                            if result[i] == "}" or result[i] == ",":
                                dic[key] = int(value)
                                key = ""
                                value = ""
                                i += 1
                                break
                            else:
                                value += result[i]
                                i += 1
                    elif key == "name":
                        i += 2  # start from character not '
                        while True:
                            if result[i] == "}" or result[i] == "'":
                                if result[i] == "}":
                                    res.append(dic)
                                    dic = {}

                                dic[key] = value
                                key = ""
                                value = ""
                                i += 1
                                break
                            else:
                                value += result[i]  # if for '
                                i += 1
                    elif key == "progress":
                        i += 1
                        while True:
                            if result[i] == "}" or result[i] == ",":
                                if result[i] == "}":
                                    res.append(dic)
                                    dic = {}
                                dic[key] = int(value)
                                key = ""
                                value = ""
                                i += 1
                                break
                            else:
                                value += result[i]
                                i += 1
                    elif key == "end":
                        i += 1
                        while True:
                            if result[i] == "}" or result[i] == ",":
                                if result[i] == "}":
                                    res.append(dic)
                                    dic = {}
                                dic[key] = int(value)
                                key = ""
                                value = ""
                                i += 1
                                break
                            else:
                                value += result[i]
                                i += 1
                    elif key == "id":
                        i += 2  # start from character not '
                        while True:
                            if result[i] == "}" or result[i] == "'":
                                if result[i] == "}":
                                    res.append(dic)
                                    dic = {}
                                dic[key] = value
                                key = ""
                                value = ""
                                i += 1
                                break
                            else:
                                value += result[i]
                                i += 1
                    elif key == "type":
                        i += 2  # start from character not '
                        while True:
                            if result[i] == ",":
                                dic[key] = value
                                key = ""
                                value = ""
                                i += 1
                                break
                            elif result[i] == "}":

                                dic[key] = value
                                res.append(dic)
                                dic = {}
                                key = ""
                                value = ""
                                i += 1
                                break
                            elif result[i] != "'":
                                value += result[i]
                            i += 1
                    elif key == "hideChildren":
                        i += 1  # start from character not '
                        while True:
                            if result[i] == "}" or result[i] == ",":

                                if value == "false":  # false}
                                    dic[key] = False
                                elif value == "true":
                                    dic[key] = True

                                if result[i] == "}":
                                    res.append(dic)
                                    dic = {}
                                key = ""
                                value = ""
                                i += 1
                                break

                            else:
                                value += result[i]
                                i += 1
                    elif key == "project":
                        i += 2  # start from character not '
                        while True:
                            if result[i] == "}" or result[i] == "'":
                                dic[key] = value
                                if result[i] == "}":
                                    res.append(dic)
                                    dic = {}

                                key = ""
                                value = ""
                                i += 1
                                break
                            else:
                                value += result[i]
                                i += 1
                    elif key == "dependencies":
                        i += 2
                        temp_ls = []
                        while True:

                            if result[i] == "]":
                                dic[key] = temp_ls
                                res.append(dic)
                                dic = {}
                                key = ""
                                value = ""
                                i += 1
                                break
                            elif result[i] == "'":
                                temp_str = ""
                                i += 1
                                while True:
                                    if result[i] == "'":
                                        temp_ls.append(temp_str)
                                        temp_str = ""
                                        i += 1
                                        break
                                    else:
                                        temp_str += result[i]
                                        i += 1

        i += 1
    return res
# For generating token


def tokengen():
    purgetoken()
    token = ''.join(secrets.choice(string.ascii_letters + string.digits)
                    for _ in range(8))
    while checktoken(token):
        token = ''.join(secrets.choice(string.ascii_letters +
                                       string.digits) for _ in range(8))
    return token

# for purging invalid tokens


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

# for checking token exists


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


def modify_info(isLogin, message):
    login_info["isLogin"] = isLogin
    login_info["message"] = message
    print(login_info["message"])
    print(type(login_info))


def modify_token(uses, token):
    cur = database.cursor()
    cur.execute(
        "UPDATE token SET uses= (%s - 1) WHERE token = %s;", (uses, token))
    database.commit()


# Below for api
# for receiving the data from front end. After front end finish the definition page, api will be created in the frontend.
@app.route('/getuuid', methods=['POST'])
def get_script():
    data = request.json
    print(data)
    if data:
        # send the data to the algorithm. It should have parameter string, but for testing the connectivity I defined in the post_script
        uuid = post_script(data)
        return uuid


def post_script(data):  # string will replace the variable s below

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
    r = requests.post(url, data=data)
    uuid = json.loads(r.text)
    return uuid


@app.route('/getres', methods=['POST'])
def post_uid():
    data = request.json
    if data:
        url = 'http://localhost:8083/home/getres'
        r = requests.post(url, data=data)
        algorithm_result = json.loads(r.text)
        return algorithm_result


@app.route('/getAllSchedules', methods=['GET'])
# 1. try catch
# 2. format
# 3. cursor close
def getAllSchedule():
    res_list = []
    cur = database.cursor(dictionary=True)
    # TODO exclude script
    try:
        cur.execute("SELECT * FROM schedule ORDER BY startdate DESC")
    except Exception as e:
        # print(e)
        return jsonify({"code": -2, "data": {}, "message": e})
    else:
        for schedule in cur:
            res_str = json.dumps(schedule, cls=MyEncoder)
            #res_str=res_str.replace("'", '"')
            #res_str=res_str.replace("\\", '')

            res_json = json.loads(res_str)
            modify_result = handle_result(res_json["result"])
            res_json["result"] = modify_result
            # print(res_json["result"])
            print("--------------------------")
            res_list.append(res_json)
    finally:
        cur.close()
    #data = request.json
    # if data:
    #     #skip_schedule = data["skipschedule"]
    #     cur = database.cursor(dictionary=True)
    #     cur.execute("SELECT * FROM schedule ORDER BY startdate DESC")
        # cur.execute("SELECT * FROM schedule ORDER BY startdate DESC LIMIT (%d,%d);",(skip_schedule,skip_schedule+20))

    mydict = {}
    mydict['result'] = res_list
    if res_list:
        my_json = jsonify({"code": 1, "data": mydict,
                           "message": "Successfully get the schedules!"})
        # print(my_json)
        return my_json
    else:
        return jsonify({"code": -1, "data": {}, "message": "No schedules!"})


@app.route('/saveSchedule', methods=['POST'])
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
        cur.execute("INSERT INTO schedule (name, uid, script, timelength, result, status, errlog, description, uuid) VALUES ( %s, %d, %s, %d, %s, %d, %s, %s, %s);",
                    (name, uid, script, timelength, result, status, errlog, description, uuid))
        # INSERT INTO schedule (name, uid, script, timelength, result, status, errlog, description, uuid) VALUES ('schedule 1',1,'i am handsome',3,"[{'start':0,'name':'Maachine 0','progress':0,'end':5,'id':'Machine 0','type':'project','hideChildren':false},{'start':0,'name':'job_0 task_0','progress':0,'project':'Machine 0','end':3,'id':'job_0|task_0','type':'task'},{'start':3,'name':'job_1 task_0','progress':0,'project':'Machine 0','end':5,'id':'job_1|task_0','type':'task'},{'start':0,'name':'Maachine 1','progress':0,'end':10,'id':'Machine 1','type':'project','hideChildren':false},{'start':0,'name':'job_2 task_0','progress':0,'project':'Machine 1','end':4,'id':'job_2|task_0','type':'task'},{'start':4,'name':'job_0 task_1','progress':0,'project':'Machine 1','end':6,'id':'job_0|task_1','type':'task','dependencies':['job_0|task_0']},{'start':6,'name':'job_1 task_2','progress':0,'project':'Machine 1','end':10,'id':'job_1|task_2','type':'task','dependencies':['job_1|task_1']},{'start':4,'name':'Maachine 2','progress':0,'end':9,'id':'Machine 2','type':'project','hideChildren':false},{'start':4,'name':'job_2 task_1','progress':0,'project':'Machine 2','end':7,'id':'job_2|task_1','type':'task','dependencies':['job_2|task_0']},{'start':7,'name':'job_0 task_2','progress':0,'project':'Machine 2','end':9,'id':'job_0|task_2','type':'task','dependencies':['job_0|task_1']},{'start':5,'name':'Maachine 12','progress':0,'end':6,'id':'Machine 12','type':'project','hideChildren':false},{'start':5,'name':'job_1 task_1','progress':0,'project':'Machine 12','end':6,'id':'job_1|task_1','type':'task','dependencies':['job_1|task_0']}]", -1, "none",'good schedule','8jug7g7g');
        database.commit()


@app.route('/login', methods=['POST'])
def test():

    data = request.json
    try:
        if data:
            print(data)
            username = data['username']
            password = data['password']
            cur = database.cursor(dictionary=True)
            cur.execute(
                "SELECT username, password FROM user WHERE username = %s AND password = %s;", (username, password))
            #cur.execute("SELECT uid, displayname, rank, disabled FROM user WHERE username = %s AND password = %s;", (username, password,))
            #cur.execute("SELECT uid, displayname, rank, disabled FROM user WHERE username = %s AND password = AES_ENCRYPT(%s, UNHEX(SHA2('', )));", (username, password,))
    except Exception as e:
        return jsonify({"code": -2, "data": {}, "message": e})
    finally:
        account = cur.fetchone()
        cur.close()

    if account:
        modify_info(1, "Login successfully!")
    else:
        modify_info(0, "Login not successful")
    return jsonify({"code": login_info["isLogin"], "message": login_info["message"]})

# registration page


@app.route('/registration', methods=['POST'])
def registration():

    json_data = request.json

    if json_data:
        # check token in db
        tokendata = checktoken(json_data["data"]["token"])
        if tokendata:
            if checkusername(json_data["data"]["username"]):
                # modify the uses times
                uses = tokendata['uses']
                modify_token(uses, tokendata)
                # store the user in the database
                cur = database.cursor()
                username = json_data["data"]["username"]
                displayname = json_data["data"]["displayname"]
                password = json_data["data"]["password"]
                cur.execute(
                    "SELECT ranks FROM token WHERE token = %s;", (tokendata))
                rank = cur.fetchone()["ranks"]
                database.commit()

                cur.execute("""
                INSERT INTO user (username, displayname, password, rank)
                VALUES (%s, %s, %s, %s);
                """, (username, displayname, password, rank,))  # CHANGE2022-01-15
                database.commit()
                return jsonify({"code": 1, "message": "Succesfully register."})
            else:
                return jsonify({"code": 0, "message": "Username already exist."})

        else:
            # tokendata not exist/wrong pass
            err = "This token is invalid."
            return jsonify({"code": -1, "message": err})


# for getting the token from the manager
@app.route('/genToken', methods=['POST'])
def genToken():
    json_data = request.json
    if json_data:

        dateexpire = json_data["data"]["dateexpire"]
        rank = json_data["data"]["rank"]  # 0 for planner 1 for manager
        uses = json_data["data"]["uses"]

        token = tokengen()
        if token is None:
            return jsonify({"code": -1, "data": "", "message": "Not successfully generating token!"})
        else:
            puttoken(token, dateexpire, rank, uses)
            return jsonify({"code": 1, "data": token, "message": "Successfully generating token!"})


@app.route("/")
def hello_world():
    # post_script() #right no it's used to test the connectivity between backend and the algorithm

    return "hello world"


if __name__ == "__main__":
    app.debug = True
    app.run(port=5000)
