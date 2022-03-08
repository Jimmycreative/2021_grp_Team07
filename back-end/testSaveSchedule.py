import code
import json
import unittest
from urllib import response

from flask import jsonify
from main import app

# ===========================================================================================================================


class testSaveSchedule(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.client = app.test_client()

# ===========================================================================================================================

    def testSaveSchedule(self):

        response = app.test_client().post('/saveSchedule',
                                          data=json.dumps(
                                              dict()),
                                          content_type='application/json')

        json_data = response.data
        json_dict = json.loads(json_data)

        self.assertIn('code', json_dict, 'Wrong format')
        self.assertEqual(json_dict['code'], -3, 'Wrong code')

# ===========================================================================================================================


if __name__ == '__main__':
    unittest.main()
