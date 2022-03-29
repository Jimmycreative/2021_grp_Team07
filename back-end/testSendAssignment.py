from http import client
from main import app
from flask import jsonify, url_for
from urllib import response
import code
import json
import unittest
from flask import session

# This file is for the testing of method save_schedule() found by path /saveSchedule
# METHODS:
## testsendAssignment(self)
# ===========================================================================================================================

class testSendAssignment(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.client = app.test_client()

# ===========================================================================================================================
# testSendAssignment(self)
## Test sendAssignment() output for empty json from front end
## DESTINATION:
### '/sendAssignment'
## POST:
### {'planner'="exampleplanner", 'title'="nelrnf234r5", 'description'="nci34u89d"}
## EXPECTED:
### {'code' = 1, 'message' = 'success'}

    def testSendAssignment(self):
        
        # with app.test_client().session_transaction() as testsession:
        #     testsession['username'] = "admin"

        # with app.test_client() as client:
        #     with client.session_transaction() as sess:
        #         sess["username"] = "admin"
        
        #set session username
        with app.test_client() as client:
            with client.session_transaction() as sess:
                sess["username"] = "admin"

        # @live_server.app.route('/sendAssignment')
        # def set_session():
        #     session["username"] = "admin"
        #     return session["username"]

        # response = client.get(url_for("set_session"))
        
        #send json
        response = app.test_client().post('/sendAssignment', data=json.dumps(
            dict(planner="exampleplanner", title="nelrnf234r5", description="nci34u89d")),
            content_type='application/json')
        
        #get return json
        json_data = response.data
        #convert json into dictionary
        json_dict = json.loads(json_data)
        
        #check if code is in dictionary
        self.assertIn('code', json_dict, 'Wrong format')
        #check if 'message' is in dictonary
        self.assertIn('message', json_dict, 'Wrong format')
        
        #check if code = 1
        self.assertEqual(json_dict['code'], 1, 'Wrong code')
        #check if message is correct
        self.assertEqual(json_dict['message'], "success", 'Wrong code')

# ===========================================================================================================================


if __name__ == '__main__':
    unittest.main()
