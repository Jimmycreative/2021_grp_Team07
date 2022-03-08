from main import app
from flask import jsonify
from urllib import response
import code
import json
import unittest
from flask import session


# ===========================================================================================================================


class testSendAssignment(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.client = app.test_client()

# ===========================================================================================================================

    def testSendAssignment(self):

        with app.test_client().session_transaction() as testsession:
            testsession['username'] = "admin"

        response = app.test_client().post('/sendAssignment', data=json.dumps(
            dict(planner="exampleplanner", title="nelrnf234r5", description="nci34u89d")),
            content_type='application/json')

        json_data = response.data
        json_dict = json.loads(json_data)

        self.assertIn('code', json_dict, 'Wrong format')
        self.assertEqual(json_dict['code'], 1, 'Wrong code')

# ===========================================================================================================================


if __name__ == '__main__':
    unittest.main()
