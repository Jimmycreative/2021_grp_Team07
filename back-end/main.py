# You should not import any additional modules
# You can, however, import additional functionalities
# from the flask and sqlite3 modules
from distutils.cygwinccompiler import CygwinCCompiler
from turtle import title
from unicodedata import name
from click.types import convert_type
from flask import Flask, request, session, make_response
import mysql.connector
from flask import jsonify
from flask_cors import CORS
# from cross import crossdomain
import json
import requests
import secrets
import string
import datetime
import json
import decimal
import re


from flask_session import Session
from sqlalchemy import null


class MyEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, bytearray):
            return str(obj, encoding='utf-8')
        elif isinstance(obj, bytes):
            return str(obj, encoding='utf-8')
        elif isinstance(obj, datetime.datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, decimal.Decimal):
            return float(obj)
        super(MyEncoder, self).default(obj)

        return json.JSONEncoder.default(self, obj)


app = Flask(__name__)
CORS(app,supports_credentials=True)


app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = '123456'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.secret_key = "hello"

Session(app)

# host="192.168.64.2",
#     port=3306,
#     user="unnc",
#     password="Uk.JgBsQn]bQp[2u",
#     database="unnc_team_2021-07-p16"

database = mysql.connector.connect(


    # host="10.6.2.51",
    # user="Team202107",
    # database="Team202107",
    # password="Team202107",
    # auth_plugin='mysql_native_password'
    host="127.0.0.1",
    user="root",
    database="grp",
    password="12345678",
    auth_plugin='mysql_native_password'
    
    # host="192.168.64.2",
    # user="unnc",
    # password="Uk.JgBsQn]bQp[2u",
    # database="grp"

)
# login_info = {
#     "code": -1,
#     "message": ""
# }
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
        print(str(e))


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
    WHERE token = %s
    AND disabled = 0
    AND (dateexpire IS NULL OR dateexpire > CURRENT_TIMESTAMP())
    AND uses <> 0;
    """, (token,))

    tokendata = cur.fetchone()
    if tokendata:
        return tokendata
    else:
        return False


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
        cur.execute("SELECT * FROM user WHERE role = 0;")
        for planner in cur:
            planner_str = json.dumps(planner, cls=MyEncoder)
            planner_json = json.loads(planner_str)
            planners.append(planner_json)

        res_json['result'] = planners
        print(res_json)

    except Exception as e:
        return jsonify({"code": -2, "data": {}, "message": str(e)})
    finally:
        cur.close()
    return jsonify(res_json)


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

            planner = data['planner']
            title = data['title']
            description = data['description']
            manager = session.get("username")
            print(manager)

            cur = database.cursor(dictionary=True)
            cur.execute("INSERT INTO assignment (title, description, manager, planner) VALUES ( %s, %s, %s, %s);",
                        (title, description, manager, planner))
            database.commit()
    except Exception as e:
        database.rollback()

        print(str(e))

        res_json['code'] = -2
        res_json['message'] = str(e)
    finally:
        cur.close()
    return jsonify(res_json)

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
        # manager = "Jimmy"
        sql = "SELECT * FROM assignment WHERE manager='%s';" % (manager)
        cur.execute(sql)
        for assignement in cur:
            assignement_str = json.dumps(assignement, cls=MyEncoder)
            assignement_json = json.loads(assignement_str)
            assignments.append(assignement_json)

        res_json['data'] = assignments
    except Exception as e:

        res_json['code'] = -2
        res_json['message'] = str(e)
    finally:
        cur.close()
    return jsonify(res_json)


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
        planner = "sheldon"
        sql = """
        SELECT manager, COUNT(*) AS unfinished_assignment, GROUP_CONCAT(title) AS title,
            GROUP_CONCAT(description) AS description,
            GROUP_CONCAT(datecreated) AS datecreated
            FROM assignment a
            WHERE a.planner = %s
            AND NOT a.aid IN (SELECT ss.aid from schedule ss)
            GROUP BY manager;
        """
        sql1 = """
            SELECT manager, COUNT(*) AS unfinished_assignment
            FROM assignment a
            WHERE a.planner = %s
            AND NOT a.aid IN (SELECT ss.aid from schedule ss)
            GROUP BY manager;
            """
        sql2 = """
            SELECT manager, GROUP_CONCAT(title) AS title,
            GROUP_CONCAT(description) AS description,
            GROUP_CONCAT(datecreated) AS datecreated
            FROM assignment WHERE planner=%s GROUP BY manager
        """  # %planner
        cur.execute(sql, (planner, ))
        #

        for record in cur:
            record_str = json.dumps(record, cls=MyEncoder)
            record_json = json.loads(record_str)
            temp_list.append(record_json)

        res_json['data'] = sortPlannerList(temp_list)

    except Exception as e:
        res_json['code'] = -2
        res_json['message'] = str(e)
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

        # status = my_json['status']
        description = my_json['description']
        start = my_json['datecreated']

        title_list = getAttributeList(titles)
        # status_list = getAttributeList(status)
        description_list = getAttributeList(description)
        start_list = getAttributeList(start)

        for i in range(len(title_list)):
            temp_json = {}
            temp_json['title'] = title_list[i]

            # temp_json['status'] = status_list[i]
            temp_json['description'] = description_list[i]
            temp_json['start'] = start_list[i]
            temp_json['manager'] = manager
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
    
    print(type(data))
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
        print(algorithm_result)
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
            # res_str=res_str.replace("'", '"')
            # res_str=res_str.replace("\\", '')

            res_json = json.loads(res_str)
            modify_result = eval(res_json["result"].replace("false", "False"))
            res_json["result"] = modify_result
            # print(res_json["result"])
            print("--------------------------")
            res_list.append(res_json)
    except Exception as e:
        # print(e)
        return jsonify({"code": -2, "data": {}, "message": str(e)})

    finally:
        cur.close()
    # data = request.json
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

            name = data["name"]
            #startdate = data["startdate"]
            # uid = session["uid"]
            # uid = "123"
            script = data["script"]
            timelength = data["timelength"]
            result = data["result"]
            status = data["status"]
            errlog = data["errlog"]
            description = data["description"]
            uuid = data["uuid"]
            aid = data["aid"]

            # cur.execute("SELECT name FROM schedule WHERE aid='%s';" % (aid))
            # account = cur.fetchone()
            # if account:
            #     name = account["name"]
            # else:
            #     return jsonify({"code": -2, "data": {}, "message": "aid doesn't exist!"})

            cur.execute("""
            INSERT INTO schedule (aid, name, description, script, result, timelength, status, errlog, uuid) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
            """, (aid, name, description, script, result, timelength, status, errlog, uuid,))
            # INSERT INTO schedule (name, uid, script, timelength, result, status, errlog, description, uuid) VALUES ('schedule 1',1,'i am handsome',3,"[{'start':0,'name':'Maachine 0','progress':0,'end':5,'id':'Machine 0','type':'project','hideChildren':false},{'start':0,'name':'job_0 task_0','progress':0,'project':'Machine 0','end':3,'id':'job_0|task_0','type':'task'},{'start':3,'name':'job_1 task_0','progress':0,'project':'Machine 0','end':5,'id':'job_1|task_0','type':'task'},{'start':0,'name':'Maachine 1','progress':0,'end':10,'id':'Machine 1','type':'project','hideChildren':false},{'start':0,'name':'job_2 task_0','progress':0,'project':'Machine 1','end':4,'id':'job_2|task_0','type':'task'},{'start':4,'name':'job_0 task_1','progress':0,'project':'Machine 1','end':6,'id':'job_0|task_1','type':'task','dependencies':['job_0|task_0']},{'start':6,'name':'job_1 task_2','progress':0,'project':'Machine 1','end':10,'id':'job_1|task_2','type':'task','dependencies':['job_1|task_1']},{'start':4,'name':'Maachine 2','progress':0,'end':9,'id':'Machine 2','type':'project','hideChildren':false},{'start':4,'name':'job_2 task_1','progress':0,'project':'Machine 2','end':7,'id':'job_2|task_1','type':'task','dependencies':['job_2|task_0']},{'start':7,'name':'job_0 task_2','progress':0,'project':'Machine 2','end':9,'id':'job_0|task_2','type':'task','dependencies':['job_0|task_1']},{'start':5,'name':'Maachine 12','progress':0,'end':6,'id':'Machine 12','type':'project','hideChildren':false},{'start':5,'name':'job_1 task_1','progress':0,'project':'Machine 12','end':6,'id':'job_1|task_1','type':'task','dependencies':['job_1|task_0']}]", -1, "none",'good schedule','8jug7g7g');
            database.commit()
            # cur.execute(
            #     "UPDATE assignment SET _status = 1 WHERE aid = %s;", (aid))
            database.commit()
            return jsonify({"code": 1, "data": "", "message": "Successfully stored schedule and update assignment!"})
        except Exception as e:
            database.rollback()
            print(str(e))
            return jsonify({"code": -2, "data": {}, "message": str(e)})


@app.route('/login', methods=['GET', 'POST'])
def login():

    data = request.json       
    print(data)
    result = {}

    login_info = {
        "code": -1,
        "message": ""
    }
    
    if data:
        print("e")
        username = data['username']
        password = data['password']
        cur = database.cursor(dictionary=True)
        cur.execute(
            "SELECT username, password, role FROM user WHERE username = %s AND password = %s AND disabled = 0;", (username, password))
        # cur.execute("SELECT uid, displayname, rank, disabled FROM user WHERE username = %s AND password = %s;", (username, password,))
        # cur.execute("SELECT uid, displayname, rank, disabled FROM user WHERE username = %s AND password = AES_ENCRYPT(%s, UNHEX(SHA2('encryption_key', )));", (username, password,))
        account = cur.fetchone()
        if account:
            # modify_info(1, "Login successfully!")
            login_info["code"] = 1
            login_info["message"] = "Login successfully!"
            account_str = json.dumps(account, cls=MyEncoder)
            account_json = json.loads(account_str)
            session["username"] = account_json["username"]
            result["username"] = username
            result["role"] = account_json["role"]
            result["isLogin"] = 1

        else:
            # modify_info(0, "Login not successful")
            login_info["code"] = 0
            login_info["message"] = "Login not successful"

        cur.close()
    return jsonify({"code": login_info["code"], "data": result, "message": login_info["message"]})

    # except Exception as e:
    #   return jsonify({"code": -2, "data": {}, "message": str(e)})

# registration page


@app.route('/registration', methods=['POST'])
def registration():

    json_data = request.json

    # print(json_data)

    if json_data:
        # check token in db
        tokendata = checktoken(json_data["data"]["token"])
        if tokendata:
            if not checkusername(json_data["data"]["username"]):
                # modify the uses times

                uses = int(tokendata['uses'])

                modify_token(uses, tokendata['token'])

                username = json_data["data"]["username"]
                displayname = json_data["data"]["displayname"]
                password = json_data["data"]["password"]
                rank = tokendata['role']
                # store the user in the database
                try:
                    cur = database.cursor()

                    # cur.execute(
                    #     "SELECT ranks FROM token WHERE token = %s;", (tokendata['token']))
                    # rank = cur.fetchone()["ranks"]
                    # database.commit()

                    cur.execute("""
                    INSERT INTO user (username, displayname, password, role)
                    VALUES (%s, %s, %s, %s);
                    """, (username, displayname, password, rank,))  # CHANGE2022-01-15
                    database.commit()
                    return jsonify({"code": 1, "message": "Succesfully register."})
                except Exception as e:
                    return jsonify({"code": -2, "data": {}, "message": str(e)})
            else:
                return jsonify({"code": 0, "message": "Username already exist."})

        else:
            # tokendata not exist/wrong pass
            err = "This token is invalid."
            return jsonify({"code": -1, "message": err})
    else:
        return jsonify({"code": -3, "message": "Data is empty"})


# for getting the token from the manager
@app.route('/genToken', methods=['POST'])
def genToken():
    json_data = request.json

    if json_data:
        dateexpire = json_data["expirationDate"]
        role = json_data["rank"]  # 0 for planner 1 for manager
        uses = json_data["uses"]

        purgetoken()
        token = ''.join(secrets.choice(string.ascii_letters + string.digits)
                        for _ in range(8))

        while checktoken(token):
            token = ''.join(secrets.choice(string.ascii_letters +
                            string.digits) for _ in range(8))

        if uses == "":
            uses = str(-1)
        # print("type: ",type(uses))

        try:
            cur = database.cursor()
            if dateexpire == "":

                cur.execute("""
                INSERT INTO token (token, dateexpire, role, uses) VALUES (%s, NULL, %s, %s);""", (token, role, uses))
            else:
                cur.execute("""
                INSERT INTO token (token, dateexpire, role, uses)
                VALUES (%s, %s, %s, %s);
                """, (token, dateexpire, role, int(uses)))
                database.commit()
        except Exception as e:
            return jsonify({"code": -2, "data": {}, "message": str(e)})
        finally:
            cur.close()

        if token is None:
            return jsonify({"code": -1, "data": "", "message": "Not successfully generating token!"})
        else:
            # puttoken(token, dateexpire, role, uses)
            return jsonify({"code": 1, "data": token, "message": "Successfully generating token!"})
    #return


@app.route('/inputData', methods=['POST'])
def inputData():
    data = request.json
    print(data)
    if data:
       
        # send the data to the algorithm. It should have parameter string, but for testing the connectivity I defined in the post_script
        result = data["scriptData"].split("\n")
        
        
        output = ""
        result = [i for i in result if i]
        index_type = int(result.pop(0))
        print("index:",index_type)
        #print(result)
        for i in range(0,len(result)):
            output += "job"+str(i+1)+" = "+result[i]+"\n"
            if i==len(result)-1:
                temp = "jobs" + " = "+"["
                for i in range(0,len(result)):
                    if i==len(result)-1:
                        temp+="job"+str(i+1)+"]"+"\n"
                    else:
                        temp+="job"+str(i+1)+","
                output+=temp
            
        
        if index_type == 0:
            #basic
            output += '''myformat=algorithm.standardize(jobs)\njs_jobs=myformat.jobs\njs_machines=myformat.machines'''
            output += "\n"+"return model.runModel(type=1, originalData=myformat)"
            print(output)
            result = {"script":output}
            uuid = post_script(result)
        elif index_type == 1:
            #dynamic
            
            temp2 = "decision_var start = 0\ndecision_var end = 5\ndecision_var priority = ["

            for i in range(1,len(result)+1):
                
                if i==len(result):
                    
                    temp2+=str(i)+"]"+"\n"
                else:
                    temp2 += str(i)+","
            output = temp2+output
            output += "myformat=algorithm.standardize(jobs)\njs_jobs=myformat.jobs\njs_machines=myformat.machines"
            output += "\n"+"return model.runModel(type=2, originalData=myformat)"
            print(output)
            result = {"script":output}
            uuid = post_script(result)
        elif index_type == 2:
            #flexible
            output += "\n"+"return model.runModel(type=3, originalData=null)"
            result = {"script":output}
            uuid = post_script(result)
        elif index_type == 3:
            #multi
            output += "\n"+"return model.runModel(type=4, originalData=null)"
            print(output)
            result = {"script":output}
            uuid = post_script(result)
        return uuid
  
@app.route("/")
def hello_world():
    return "hello"
    # post_script() #right no it's used to test the connectivity between backend and the algorithm

    return "hello world"


if __name__ == "__main__":

    app.debug = True
    app.run(port=5000)
