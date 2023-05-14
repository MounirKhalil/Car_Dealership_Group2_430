import unittest
from unittest.mock import patch
from flask import Flask
from app import app

class DeleteCarTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    @patch('app.mongo.db.cars')
    def test_delete_car_invalid_id(self, mock_cars):
        mock_delete_one = mock_cars.delete_one
        mock_delete_one.return_value.deleted_count = 0

        response = self.app.delete('/delete_car/invalid_id')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {'error': 'Invalid car ID'})
        mock_delete_one.assert_not_called()

if __name__ == '__main__':
    unittest.main()
