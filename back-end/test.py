import code

import json

import unittest

from urllib import response



from flask import jsonify

from main import app




class loginTest(unittest.TestCase):



    def setUp(self):

        app.testing = True

        self.client = app.test_client()



    def testEmptyStrUsernamePassword(self):

        response = app.test_client().post('/login', data={"username": "", "password": ""})

        json_data = response.data

        json_dict = json.loads(json_data)



        self.assertIn('code', json_dict, 'wrong format')

        self.assertEqual(json_dict['code'], -1, 'wrong code')



    # test 3




if __name__ == '__main__':

    unittest.main()