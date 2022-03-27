import code
import json
from lib2to3.pgen2 import token
import unittest
from urllib import response
import secrets
import string

from flask import jsonify
from main import app

# ===========================================================================================================================

# Testing Registration page
class testRegistration(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.client = app.test_client()

# ===========================================================================================================================

    # Testing Empty Registration
    def testNull(self):
        
        #send empty json to back end
        response = app.test_client().post('/registration',
                                          data=json.dumps(dict()),
                                          content_type='application/json')
        #get return json
        json_data = response.data
        json_dict = json.loads(json_data)
        
        #check if 'code' exists in return json
        self.assertIn('code', json_dict, 'Wrong format')
        #check if code = -3
        self.assertEqual(json_dict['code'], -3, 'Wrong code')

# ===========================================================================================================================

    # Testing Registration with bad token
    def testBadToken(self):
        
        #send json with invalid token
        response = app.test_client().post('/registration',
                                          data=json.dumps(
                                              dict(data=dict(token="nweondf", username="skkdfe",  displayname="", password="3492fvfev"))),
                                          content_type='application/json')
        
        #get return json
        json_data = response.data
        json_dict = json.loads(json_data)
        
        #check if code exists in return json
        self.assertIn('code', json_dict, 'Wrong format')
        #check if code = -1
        self.assertEqual(json_dict['code'], -1, 'Wrong code')

# ===========================================================================================================================

    # Testing successful Registration 
    def testSuccess(self):
        #generate random string for username and password
        randomStr = ''.join(secrets.choice(string.ascii_letters + string.digits)
                            for _ in range(8))
        
        #send json with valid token (works only with example data, token can be different
        response = app.test_client().post('/registration',  # BocLacM01
                                          data=json.dumps(
                                              dict(data=dict(token="BocLacM01", username=randomStr, displayname="", password=randomStr))),
                                          content_type='application/json')
        #get return json
        json_data = response.data
        #put json into dictionary
        json_dict = json.loads(json_data)
        
        #check if code exists in return json
        self.assertIn('code', json_dict, 'Wrong format')
        #check if code = 1
        self.assertEqual(json_dict['code'], 1, 'Wrong code')

# ===========================================================================================================================

    # Testing Registration with existing Username in database
    def testExistingUsername(self):
        #send json with existing username
        response = app.test_client().post('/registration',
                                          data=json.dumps(
                                              dict(data=dict(token="BocLacM01", username="admin", displayname="", password="admin"))),
                                          content_type='application/json')
        #get return json
        json_data = response.data
        #put json into dictionary
        json_dict = json.loads(json_data)
        
        #check if code is in dictionary
        self.assertIn('code', json_dict, 'Wrong format')
        #check if code = 0
        self.assertEqual(json_dict['code'], 0, 'Wrong code')


# ===========================================================================================================================

if __name__ == '__main__':
    unittest.main()
