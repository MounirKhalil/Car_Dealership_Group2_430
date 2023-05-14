import unittest
from unittest.mock import patch

from app import app


class SignUpTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def tearDown(self):
        pass

    def test_sign_up_success(self):
        with patch('app.mongo.db.users') as mock_users_collection:
            # Mock the find_one method to return None, indicating user does not exist
            mock_users_collection.find_one.return_value = None

            data = {
                'first_name': 'John',
                'last_name': 'Doe',
                'email': 'john.doe@example.com',
                'password': 'Passw0rd!',
                'mobile': '12345678',
                'admin': False
            }

            response = self.app.post('/signup', json=data)

            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.get_json(), {'success': True})
            # Verify that the insert_one method was called once
            mock_users_collection.insert_one.assert_called_once()

    def test_sign_up_existing_user(self):
        with patch('app.mongo.db.users') as mock_users_collection:
            # Mock the find_one method to return a user, indicating user already exists
            mock_users_collection.find_one.return_value = {
                'email': 'john.doe@example.com'
            }

            data = {
                'first_name': 'John',
                'last_name': 'Doe',
                'email': 'john.doe@example.com',
                'password': 'Passw0rd!',
                'mobile': '12345678',
                'admin': False
            }

            response = self.app.post('/signup', json=data)

            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.get_json(), {'error': 'User already exists'})
            # Verify that the insert_one method was not called
            mock_users_collection.insert_one.assert_not_called()


if __name__ == '__main__':
    unittest.main()