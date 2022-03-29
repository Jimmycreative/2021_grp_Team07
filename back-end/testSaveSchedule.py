import code
import json
import unittest
from urllib import response

from flask import jsonify
from main import app


# This file is for the testing of method save_schedule() found by path /saveSchedule
# METHODS:
## testSaveSchedule(self)

# ===========================================================================================================================
#

class testSaveSchedule(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.client = app.test_client()

# ===========================================================================================================================
# testSaveSchedule(self)
## Test save_schedule() output for empty json from front end
## DESTINATION:
### '/saveSchedule'
## POST:
### {'aid'=1, 'name'="lau", 'description'="", 'script'="", 'result'="", 'timelength'=1, 'status'=0, 'errlog'="", 'uuid'=""}
## EXPECTED:
### {'code' = 1, 'message' = 'Successfully stored schedule and update assignment!'}

    def testSaveSchedule(self):
        #send json
        response = app.test_client().post('/saveSchedule',
                                          data=json.dumps(
                                              dict(aid=1, name="lau", description="", script="", result="", timelength=1, status=0, errlog="", uuid="")),
                                          content_type='application/json')
        
        #get response json
        json_data = response.data
        #convert json into dictionary
        json_dict = json.loads(json_data)
        
        
        #check if code exists in dictionary
        self.assertIn('code', json_dict, 'Wrong format')
        #check if message exists in dictionary
        self.assertIn('message', json_dict, 'Wrong format')
        
        #check if code = 1
        self.assertEqual(json_dict['code'], 1, 'Wrong code')
        #check if meesage is correct
        self.assertEqual(json_dict['message'], "Successfully stored schedule and update assignment!", 'Wrong message')

# ===========================================================================================================================


if __name__ == '__main__':
    unittest.main()
