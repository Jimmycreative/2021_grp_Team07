import code
import json
import unittest
from urllib import response

from flask import jsonify
from main import app

# ===========================================================================================================================


class testLogin(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.client = app.test_client()

# ===========================================================================================================================

    def testNullLogin(self):
        #send an empty json to /login
        response = app.test_client().post('/login',
                                          data=json.dumps(dict()),
                                          content_type='application/json')

        json_data = response.data
        json_dict = json.loads(json_data)
        #check if json has 'code'
        self.assertIn('code', json_dict, 'Wrong format')
        #check if 'code' = -1
        self.assertEqual(json_dict['code'], -1, 'Wrong code')

# ===========================================================================================================================

    def testErrorLogin(self):
        #send a bad json to /login
        response = app.test_client().post('/login',
                                          data=json.dumps(
                                              dict(username="roeigferggrger", password="4646gegegg")),
                                          content_type='application/json')

        json_data = response.data
        json_dict = json.loads(json_data)
        
        #check if json has 'code'        
        self.assertIn('code', json_dict, 'Wrong format')
        #check if 'code' = 0
        self.assertEqual(json_dict['code'], 0, 'Wrong code')

# ===========================================================================================================================

    def testSuccessLogin(self):
        #send a good json to /login
        response = app.test_client().post('/login',
                                          data=json.dumps(
                                              dict(username="admin", password="admin")),
                                          content_type='application/json')

        json_data = response.data
        json_dict = json.loads(json_data)
        
        #check if json has 'code'  
        self.assertIn('code', json_dict, 'Wrong format')
        #check if 'code' = 1
        self.assertEqual(json_dict['code'], 1, 'Wrong code')


# ===========================================================================================================================

if __name__ == '__main__':
    unittest.main()
