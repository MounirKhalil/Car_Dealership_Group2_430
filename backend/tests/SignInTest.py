import unittest
from flask import Flask
from flask import json
from unittest.mock import patch
import bcrypt

from app import app


class SignInTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def tearDown(self):
        pass

    def test_sign_in_success(self):
        with patch('pymongo.collection.Collection.find_one') as mock_find_one:
            mock_find_one.return_value = {
                '_id': '123',
                'email': 'user@example.com',
                'password': bcrypt.hashpw('password'.encode('utf-8'), bcrypt.gensalt()),
                'admin': False
            }

            response = self.app.post('/signin', json={
                'email': 'user@example.com',
                'password': 'password'
            })

            data = json.loads(response.data)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['id'], '123')
            self.assertTrue(data['success'])
            self.assertFalse(data['admin'])
            self.assertIn('token', data)

    def test_sign_in_invalid_credentials(self):
        with patch('pymongo.collection.Collection.find_one') as mock_find_one:
            mock_find_one.return_value = None

            response = self.app.post('/signin', json={
                'email': 'user@example.com',
                'password': 'password'
            })
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.data, b'{"error":"Invalid username or password"}\n' )


if __name__ == '__main__':
    unittest.main()
