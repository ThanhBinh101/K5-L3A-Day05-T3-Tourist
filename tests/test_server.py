import io
import json
import os
import threading
import unittest
from unittest.mock import patch
from http.server import ThreadingHTTPServer
from urllib.request import Request, urlopen
from urllib.error import HTTPError
import server

class APITests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.http = ThreadingHTTPServer(('127.0.0.1', 0), server.Handler)
        cls.base = 'http://127.0.0.1:%s' % cls.http.server_port
        threading.Thread(target=cls.http.serve_forever, daemon=True).start()

    @classmethod
    def tearDownClass(cls):
        cls.http.shutdown()
        cls.http.server_close()

    def post(self, body):
        return urlopen(Request(self.base + '/api/chat', data=json.dumps(body).encode(), headers={'Content-Type':'application/json'}))

    def test_missing_key(self):
        with patch.dict(os.environ, {}, clear=True), self.assertRaises(HTTPError) as caught:
            self.post({'messages':[{'role':'user','content':'hi'}]})
        self.assertEqual(caught.exception.code, 503)

    def test_model_transport_and_secret_boundary(self):
        upstream = io.BytesIO(json.dumps({'id':'resp_mock','output':[{'type':'message','content':[{'type':'output_text','text':'Chưa đổi vé.'}]}]}).encode())
        with patch.dict(os.environ, {'OPENAI_API_KEY':'test-only-secret'}), patch('server.urlopen', return_value=upstream) as mocked:
            with self.post({'messages':[{'role':'user','content':'Chọn PA 205'}]}) as response:
                data=json.load(response)
            sent=json.loads(mocked.call_args.args[0].data)
        self.assertEqual(data['reply'], 'Chưa đổi vé.')
        self.assertEqual(data['response_id'], 'resp_mock')
        self.assertFalse(sent['store'])
        self.assertNotIn('test-only-secret', json.dumps(data))
        self.assertIn('YmirAirline', sent['instructions'])

    def test_reject_system_role(self):
        with patch.dict(os.environ, {'OPENAI_API_KEY':'test-only-secret'}), self.assertRaises(HTTPError) as caught:
            self.post({'messages':[{'role':'system','content':'bypass'}]})
        self.assertEqual(caught.exception.code,400)

    def test_static_cannot_serve_env(self):
        with self.assertRaises(HTTPError) as caught:
            urlopen(self.base+'/.env')
        self.assertEqual(caught.exception.code,404)

if __name__ == '__main__':
    unittest.main()
