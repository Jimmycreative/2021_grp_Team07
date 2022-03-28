import code
import json
import unittest
from urllib import response

from flask import jsonify
from main import app

# This file is for the testing of method login() found by path /login
# METHODS:
## testNullLogin(self)
## testErrorLogin(self)
## testSuccessLogin(self)


# ===========================================================================================================================


class testLogin(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.client = app.test_client()

# ===========================================================================================================================
# testNullLogin(self)
## Test login() output for empty json from front end
## DESTINATION:
### '/login'
## POST:
### {}
## EXPECTED:
### {'code' = -1, 'message' = ''}

    def testNullLogin(self):
        #send an empty json to /login
        response = app.test_client().post('/login',
                                          data=json.dumps(dict()),
                                          content_type='application/json')

        json_data = response.data
        json_dict = json.loads(json_data)
        #check if json has 'code'
        self.assertIn('code', json_dict, 'Wrong format')
        #check if dictionary has 'message'        
        self.assertIn('message', json_dict, 'Wrong format')
        
        #check if 'code' = -1
        self.assertEqual(json_dict['code'], -1, 'Wrong code')
        #check if message is correct
        self.assertEqual(json_dict['message'], '', "Wrong message")

# ===========================================================================================================================
# testErrorLogin(self)
## Test login() output for json with invalid credentials from front end
## DESTINATION:
### '/login'
## POST:
### {'username'="roeigferggrger", 'password'="4646gegegg"}
## EXPECTED:
### {'code' = 0, 'message' = 'Login not successful'}

    def testErrorLogin(self):
        #send a bad json to /login
        response = app.test_client().post('/login',
                                          data=json.dumps(
                                              dict(username="roeigferggrger", password="4646gegegg")),
                                          content_type='application/json')
        
        #get return json
        json_data = response.data
        #convert json to dictionary
        json_dict = json.loads(json_data)
        
        #check if dict has 'code'        
        self.assertIn('code', json_dict, 'Wrong format')
        #check if dictionary has 'message'        
        self.assertIn('message', json_dict, 'Wrong format')
        
        #check if 'code' = 0
        self.assertEqual(json_dict['code'], 0, 'Wrong code')
        #check if message is correct
        self.assertEqual(json_dict['message'], 'Login not successful', "Wrong message")

# ===========================================================================================================================
# testSuccessLogin(self)
## Test login() output for json with valid credentials from front end
## DESTINATION:
### '/login'
## POST:
### {'username'="admin", 'password'="admin"}
## EXPECTED:
### {'code' = 1, 'message' = 'Login successful!'}

    def testSuccessLogin(self):
        #send a good json to /login
        response = app.test_client().post('/login',
                                          data=json.dumps(
                                              dict(username="admin", password="admin")),
                                          content_type='application/json')
        
        #get return json
        json_data = response.data
        #convert json to dictionary
        json_dict = json.loads(json_data)
        
        #check if dictionary has 'code'  
        self.assertIn('code', json_dict, 'Wrong format')
        #check if dictionary has 'message'
        self.assertIn('message', json_dict, 'Wrong format')
        
        #check if 'code' = 1
        self.assertEqual(json_dict['code'], 1, 'Wrong code')
        #chck if message is correct
        self.assertEqual(json_dict['message'], "Login successfully!", 'Wrong code')


# ===========================================================================================================================

if __name__ == '__main__':
    unittest.main()
