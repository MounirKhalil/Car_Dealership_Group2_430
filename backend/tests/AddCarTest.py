import unittest
from unittest.mock import patch
from flask import Flask
from app import app

class AddCarTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    @patch('app.mongo.db.cars')
    def test_add_car_success(self, mock_cars): 
        mock_insert_one = mock_cars.insert_one
        car_data = {
            'make': 'Toyota',
            'model': 'Camry',
            'year': 2020,
            'price': 25000,
            'color': 'Silver',
            'image': 'car1.jpg'
        }

        response = self.app.post('/addcars', json=car_data)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode(), 'Car added successfully')
        mock_insert_one.assert_called_once_with(car_data)

if __name__ == '__main__':
    unittest.main()
