# You should not import any additional modules
# You can, however, import additional functionalities
# from the flask and sqlite3 modules
from distutils.cygwinccompiler import CygwinCCompiler
from turtle import title
from unicodedata import name
from click.types import convert_type
from flask import Flask, request, session
import mysql.connector
from flask import jsonify
from flask_cors import CORS
import json
from mysqlx import Session
import requests
import secrets
import string
import datetime
import json
import decimal
import re



from flask_session import Session

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

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY']='123456'
app.config['SESSION_PERMANENT']=False
app.config['SESSION_USE_SIGNER']=True
#app.secret_key = "hello"

CORS(app, supports_credentials=True)
Session(app)


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

# For generating token


def tokengen():
    purgetoken()
    token = ''.join(secrets.choice(string.ascii_letters + string.digits)
                    for _ in range(8))
    print(token)
    while checktoken(token):
        token = ''.join(secrets.choice(string.ascii_letters +
                                       string.digits) for _ in range(8))
    return token

# for purging invalid tokens


def purgetoken():
    try:
        cur = database.cursor()
        cur.execute("""
        DELETE FROM token
        WHERE disabled = 1
        OR dateexpire < CURRENT_TIMESTAMP()
        OR uses = 0;
        """)
        database.commit()
    except Exception as e:
        print(e)


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
        INSERT INTO token (token, dateexpire, role, uses)
        VALUES (%s, NULL, %s, %s);
        """, (token, rank, uses))
    else:
        cur.execute("""
        INSERT INTO token (token, dateexpire, role, uses)
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
    SELECT *
    FROM token
    WHERE tokenid = %s
    AND disabled = 0
    AND (dateexpire IS NULL OR dateexpire > CURRENT_TIMESTAMP()) 
    AND uses <> 0;
    """, (token,))

    tokendata = cur.fetchone()
    if tokendata:
        return True
    else:
        return False
    

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
# assignment section

# for manager
# Assign Schedules page
'''
get all planners from database
'''
@app.route('/getAllPlanners', methods=['GET'])
def getAllPlanners():
    res_json = {}
    res_json['code'] = 1
    res_json['message'] = "success"

    planners = []
    try:
        cur = database.cursor(dictionary=True)
        cur.execute("SELECT * FROM user WHERE rank = 0;")
        for planner in cur:
            planner_str = json.dumps(planner, cls=MyEncoder)
            planner_json = json.loads(planner_str)
            planners.append(planner_json)
        cur.close()

        res_json['result'] = planners
        print(res_json)
        return res_json
    except Exception as e:
        return jsonify({"code": -2, "data": {}, "message": e})

# Assign Schedules page
# field
# planner, title, description
'''
manager send assignment to planners
@param json for assignment
'''
@app.route('/sendAssignment', methods=['POST'])
def sendAssignment():
    
    res_json = {}
    res_json['code'] = 1
    res_json['data'] = {}
    res_json['message'] = "success"
    try:
        data = request.json
        print(data)
        if data:
            planner=data['planner']
            title=data['title']
            description=data['description']
            manager = session.get("username")
            print(manager)
            cur = database.cursor(dictionary=True)
            cur.execute("INSERT INTO assignment (title, description, manager, planner) VALUES ( %s, %s, %s, %s);",
                        (title, description, manager, planner))
            database.commit()
    except Exception as e:
        database.rollback()
        print(e)
        res_json['code'] = -2
        res_json['message'] = e
    finally:
        cur.close()
    return res_json

# View Messages page

'''
get all assigned schedules of manager
'''
@app.route('/getAssignedSchedules', methods=['GET'])
def getAssignedSchedules():
    res_json = {}
    res_json['code'] = 1
    res_json['data'] = {}
    res_json['message'] = "success"
    try:
        assignments = []
        cur = database.cursor(dictionary=True)
        # TODO get manager from session
        manager = 'fyyc'
        sql = "SELECT * FROM assignment WHERE manager='%s';" % (manager)
        cur.execute(sql)
        for assignement in cur:
            assignement_str = json.dumps(assignement, cls=MyEncoder)
            assignement_json = json.loads(assignement_str)
            assignments.append(assignement_json)

        res_json['data'] = assignments
    except Exception as e:
        
        res_json['code'] = -2
        res_json['message'] = e
    finally:
        cur.close()
        return res_json


# for planner
# sorted by manager
'''
get all schedules of one planner
'''
@app.route('/getMySchedules', methods=['GET'])
def getMySchedules():
    res_json = {}
    res_json['code'] = 1
    res_json['data'] = {}
    res_json['message'] = "success"
    try:
        temp_list = []
        cur = database.cursor(dictionary=True)
        # TODO, get from session
        # planner=session["username"]
        planner="sheldon"
        sql="""
            SELECT manager, COUNT(IF(_status=0,1,NULL)) AS unfinished_assignment, GROUP_CONCAT(title) AS title,
            GROUP_CONCAT(_status) AS status,
            GROUP_CONCAT(description) AS description,
            GROUP_CONCAT(datecreated) AS datecreated
            FROM assignment WHERE planner='%s' GROUP BY manager
        """ % planner
        cur.execute(sql)

        for record in cur:
            record_str = json.dumps(record, cls=MyEncoder)
            record_json = json.loads(record_str)
            temp_list.append(record_json)

        res_json['data'] = sortPlannerList(temp_list)

    except Exception as e:
        res_json['code'] = -2
        res_json['message'] = e
    finally:
        cur.close()
        return res_json

# auxiliary function
'''
generate json list for messages of one planner
'''
def sortPlannerList(my_list):
    result = []
    for my_json in my_list:
        this_manager_json = {}
        this_manager_list = []
        manager = my_json['manager']
        titles = my_json['title']
        status = my_json['status']
        description = my_json['description']
        start = my_json['datecreated']

        title_list = getAttributeList(titles)
        status_list = getAttributeList(status)
        description_list = getAttributeList(description)
        start_list = getAttributeList(start)

        for i in range(len(title_list)):
            temp_json = {}
            temp_json['title'] = title_list[i]
            temp_json['status'] = status_list[i]
            temp_json['description'] = description_list[i]
            temp_json['start'] = start_list[i]
            this_manager_list.append(temp_json)

        this_manager_json['manager'] = manager
        this_manager_json['unfinished_assignment'] = my_json['unfinished_assignment']
        this_manager_json['assignment'] = this_manager_list
        result.append(this_manager_json)

    return result


def getAttributeList(concat_str):
    seperate_list = re.split(r'[,]s*', concat_str)
    return seperate_list


# definition section
# for receiving the data from front end. After front end finish the definition page, api will be created in the frontend.

'''
get uuid from script language
@param script the code snippet to define JSSP
'''
@app.route('/getuuid', methods=['GET', 'POST'])
def get_script():
    manager = session.get("username")
    print(manager)
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
    print(uuid)
    return uuid

'''
get result from script language
@param uuid to find the schedule
'''
@app.route('/getres', methods=['POST'])
def post_uid():
    data = request.json
    if data:
        url = 'http://localhost:8083/home/getres'
        r = requests.post(url, data=data)
        algorithm_result = json.loads(r.text)
        return algorithm_result


@app.route('/getAllSchedules', methods=['GET'])
def getAllSchedule():
    res_list = []
    cur = database.cursor(dictionary=True)
    # TODO exclude script
    try:
        cur.execute("SELECT * FROM schedule ORDER BY startdate DESC")
        for schedule in cur:
            res_str = json.dumps(schedule, cls=MyEncoder)
            #res_str=res_str.replace("'", '"')
            #res_str=res_str.replace("\\", '')

            res_json = json.loads(res_str)
            modify_result = eval(res_json["result"].replace("false", "False"))
            res_json["result"] = modify_result
            # print(res_json["result"])
            print("--------------------------")
            res_list.append(res_json)
    except Exception as e:
        # print(e)
        return jsonify({"code": -2, "data": {}, "message": e})

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
# TODO
def save_schedule():
    data = request.json
    print(data)
    if data:
        try:
            cur = database.cursor(dictionary=True)
            #name = data["name"]
            #uid = session["uid"]
            uid = "123"
            script = data["script"]
            timelength = data["timelength"]
            result = data["result"]
            status = data["status"]
            errlog = data["errlog"]
            description = data["description"]
            uuid = data["uuid"]
            aid = data["aid"]

            cur.execute("SELECT name FROM schedule WHERE aid='%s';"%(aid))
            account = cur.fetchone()
            if account:
                name = account["name"]
            else:
                return jsonify({"code": -2, "data": {}, "message": "aid doesn't exist!"})

            cur.execute("INSERT INTO schedule (name, uid, script, timelength, result, status, errlog, description, uuid) VALUES ( %s, %d, %s, %d, %s, %d, %s, %s, %s);",
                        (name, uid, script, timelength, result, status, errlog, description, uuid))
            # INSERT INTO schedule (name, uid, script, timelength, result, status, errlog, description, uuid) VALUES ('schedule 1',1,'i am handsome',3,"[{'start':0,'name':'Maachine 0','progress':0,'end':5,'id':'Machine 0','type':'project','hideChildren':false},{'start':0,'name':'job_0 task_0','progress':0,'project':'Machine 0','end':3,'id':'job_0|task_0','type':'task'},{'start':3,'name':'job_1 task_0','progress':0,'project':'Machine 0','end':5,'id':'job_1|task_0','type':'task'},{'start':0,'name':'Maachine 1','progress':0,'end':10,'id':'Machine 1','type':'project','hideChildren':false},{'start':0,'name':'job_2 task_0','progress':0,'project':'Machine 1','end':4,'id':'job_2|task_0','type':'task'},{'start':4,'name':'job_0 task_1','progress':0,'project':'Machine 1','end':6,'id':'job_0|task_1','type':'task','dependencies':['job_0|task_0']},{'start':6,'name':'job_1 task_2','progress':0,'project':'Machine 1','end':10,'id':'job_1|task_2','type':'task','dependencies':['job_1|task_1']},{'start':4,'name':'Maachine 2','progress':0,'end':9,'id':'Machine 2','type':'project','hideChildren':false},{'start':4,'name':'job_2 task_1','progress':0,'project':'Machine 2','end':7,'id':'job_2|task_1','type':'task','dependencies':['job_2|task_0']},{'start':7,'name':'job_0 task_2','progress':0,'project':'Machine 2','end':9,'id':'job_0|task_2','type':'task','dependencies':['job_0|task_1']},{'start':5,'name':'Maachine 12','progress':0,'end':6,'id':'Machine 12','type':'project','hideChildren':false},{'start':5,'name':'job_1 task_1','progress':0,'project':'Machine 12','end':6,'id':'job_1|task_1','type':'task','dependencies':['job_1|task_0']}]", -1, "none",'good schedule','8jug7g7g');
            database.commit()
            cur.execute("UPDATE assignment SET _status = 1 WHERE aid = %s;",(aid))
            database.commit()
            return jsonify({"code": 1, "data": "", "message": "Successfully stored schedule and update assignment!"})
        except Exception as e:
            database.rollback()
            return jsonify({"code": -2, "data": {}, "message": e})


@app.route('/login', methods=['GET','POST'])
def test():
    # session.pop("username")
    data = request.json
    print(data)
    try:
        if data:
            
            username = data['username']
            password = data['password']
            cur = database.cursor(dictionary=True)
            cur.execute(
                "SELECT username,password FROM user WHERE username = %s AND password = %s;", (username, password))
            #cur.execute("SELECT uid, displayname, rank, disabled FROM user WHERE username = %s AND password = %s;", (username, password,))
            #cur.execute("SELECT uid, displayname, rank, disabled FROM user WHERE username = %s AND password = AES_ENCRYPT(%s, UNHEX(SHA2('', )));", (username, password,))
    except Exception as e:
        return jsonify({"code": -2, "data": {}, "message": e})
    finally:
        account = cur.fetchone()
        account_str = json.dumps(account, cls=MyEncoder)
        account_json = json.loads(account_str)
        session["username"] = account_json["username"]

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
                try:
                    cur = database.cursor()
                    username = json_data["data"]["username"]
                    displayname = json_data["data"]["displayname"]
                    password = json_data["data"]["password"]
                    cur.execute(
                        "SELECT ranks FROM token WHERE tokenid = %s;", (tokendata))
                    rank = cur.fetchone()["ranks"]
                    database.commit()

                    cur.execute("""
                    INSERT INTO user (username, displayname, password, rank)
                    VALUES (%s, %s, %s, %s);
                    """, (username, displayname, password, rank,))  # CHANGE2022-01-15
                    database.commit()
                    return jsonify({"code": 1, "message": "Succesfully register."})
                except Exception as e:
                    return jsonify({"code": -2, "data": {}, "message": e})
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
    print(json_data)
    if json_data:
        print("you get it!")
        dateexpire = json_data["expirationDate"]
        role = json_data["rank"]  # 0 for planner 1 for manager
        uses = json_data["uses"]

        
        purgetoken()
        token = ''.join(secrets.choice(string.ascii_letters + string.digits)
                for _ in range(8))

        print(token)
        while checktoken(token):
            token = ''.join(secrets.choice(string.ascii_letters +
                            string.digits) for _ in range(8))
        print(token)
        if uses=="":
            uses = str(-1)
        #print("type: ",type(uses))
        try:
            cur = database.cursor()
            if dateexpire=="":
                
                cur.execute("""
                INSERT INTO token (tokenid, dateexpire, role, uses) VALUES (%s, NULL, %s, %s);""", (token, role, uses))
            else:
                cur.execute("""
                INSERT INTO token (tokenid, dateexpire, role, uses)
                VALUES (%s, %s, %s, %s);
                """, (token, dateexpire, role, int(uses)))
                database.commit()
        except Exception as e:
            return jsonify({"code": -2, "data": {}, "message": e})
        finally:
            cur.close()

        if token is None:
            return jsonify({"code": -1, "data": "", "message": "Not successfully generating token!"})
        else:
            #puttoken(token, dateexpire, role, uses)
            return jsonify({"code": 1, "data": token, "message": "Successfully generating token!"})
    return


@app.route("/")
def hello_world():
    # post_script() #right no it's used to test the connectivity between backend and the algorithm

    return "hello world"


if __name__ == "__main__":
    app.debug = True
    app.run(port=5000)
