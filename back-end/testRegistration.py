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


class testRegistration(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.client = app.test_client()

# ===========================================================================================================================

    def testNullRegistration(self):

        response = app.test_client().post('/registration',
                                          data=json.dumps(dict()),
                                          content_type='application/json')

        json_data = response.data
        json_dict = json.loads(json_data)

        self.assertIn('code', json_dict, 'Wrong format')
        self.assertEqual(json_dict['code'], -3, 'Wrong code')

# ===========================================================================================================================

    def testBadToken(self):

        response = app.test_client().post('/registration',
                                          data=json.dumps(
                                              dict(data=dict(token="nweondf", username="skkdfe",  displayname="", password="3492fvfev"))),
                                          content_type='application/json')

        json_data = response.data
        json_dict = json.loads(json_data)

        self.assertIn('code', json_dict, 'Wrong format')
        self.assertEqual(json_dict['code'], -1, 'Wrong code')

# ===========================================================================================================================

    def testSuccessRegistration(self):

        randomStr = ''.join(secrets.choice(string.ascii_letters + string.digits)
                            for _ in range(8))

        response = app.test_client().post('/registration',  # BocLacM01
                                          data=json.dumps(
                                              dict(data=dict(token="BocLacM01", username=randomStr, displayname="", password=randomStr))),
                                          content_type='application/json')

        json_data = response.data
        json_dict = json.loads(json_data)

        self.assertIn('code', json_dict, 'Wrong format')
        self.assertEqual(json_dict['code'], 1, 'Wrong code')

# ===========================================================================================================================

    def testExistingUsername(self):

        response = app.test_client().post('/registration',
                                          data=json.dumps(
                                              dict(data=dict(token="BocLacM01", username="admin", displayname="", password="admin"))),
                                          content_type='application/json')

        json_data = response.data
        json_dict = json.loads(json_data)

        self.assertIn('code', json_dict, 'Wrong format')
        self.assertEqual(json_dict['code'], 0, 'Wrong code')


# ===========================================================================================================================

if __name__ == '__main__':
    unittest.main()
