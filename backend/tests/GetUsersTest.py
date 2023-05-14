import unittest
from unittest.mock import patch
from flask import Flask
from app import app

class GetUsersTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    @patch('app.mongo.db.users')
    def test_get_users_success(self, mock_users):
        mock_find = mock_users.find
        mock_find.return_value = [
            {
                'first_name': 'ahmad',
                'last_name': 'mer',
                'email': 'ahmadmer@example.com',
                'mobile': '1234567890',
                'admin': False
            },
            {
                'first_name': 'islam',
                'last_name': 'far',
                'email': 'islamfar@example.com',
                'mobile': '9876543210',
                'admin': True
            }
        ]

        response = self.app.get('/users')

        self.assertEqual(response.status_code, 200)
        expected_data = [
            {
                'first_name': 'ahmad',
                'last_name': 'mer',
                'email': 'ahmadmer@example.com',
                'mobile': '1234567890',
                'admin': False
            },
            {
                'first_name': 'islam',
                'last_name': 'far',
                'email': 'islamfar@example.com',
                'mobile': '9876543210',
                'admin': True
            }
        ]
        self.assertEqual(response.get_json(), expected_data)
        mock_find.assert_called_once_with()

    @patch('app.mongo.db.users')
    def test_get_users_empty(self, mock_users):
        mock_find = mock_users.find
        mock_find.return_value = []

        response = self.app.get('/users')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {'error': 'No users found in database'})
        mock_find.assert_called_once_with()

if __name__ == '__main__':
    unittest.main()
