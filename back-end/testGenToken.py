import code
import json
import unittest
from urllib import response

from flask import jsonify
from main import app

# ===========================================================================================================================


class testGenToken(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.client = app.test_client()

# ===========================================================================================================================

    def testToken(self):

        response = app.test_client().post('/genToken',
                                          data=json.dumps(
                                              dict(expirationDate="", rank=0, uses=-1)),
                                          content_type='application/json')

        json_data = response.data
        json_dict = json.loads(json_data)

        self.assertIn('code', json_dict, 'Wrong format')
        self.assertEqual(json_dict['code'], 1, 'Wrong code')

        self.assertIn('data', json_dict, 'Wrong format! data does not exist')
        self.assertTrue(json_dict['data'], "Data does not exist")

        self.assertRegex(json_dict['data'],
                         "^[A-Za-z0-9]{8}$", "Invalid token format")


# ===========================================================================================================================


if __name__ == '__main__':
    unittest.main()
