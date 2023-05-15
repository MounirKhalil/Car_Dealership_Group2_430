import unittest
from unittest.mock import patch
from flask import Flask
from app import app

class GetCarInfoTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    @patch('app.mongo.db.cars')
    def test_get_car_info_success(self, mock_cars):
        mock_find_one = mock_cars.find_one
        mock_find_one.return_value = {
            '_id': '61887a273b63c8c4cfcdb0e0',
            'make': 'Toyota',
            'model': 'Camry',
            'year': 2022,
            'price': 25000,
            'color': 'Red',
            'image': 'car.jpg'
        }

        response = self.app.get('/car/61887a273b63c8c4cfcdb0e0')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {
            '_id': '61887a273b63c8c4cfcdb0e0',
            'make': 'Toyota',
            'model': 'Camry',
            'year': 2022,
            'price': 25000,
            'color': 'Red',
            'image': 'car.jpg'
        })

    @patch('app.mongo.db.cars')
    def test_get_car_info_invalid_id(self, mock_cars):
        mock_find_one = mock_cars.find_one
        mock_find_one.return_value = None

        response = self.app.get('/car/invalid_id')

        self.assertEqual(response.get_json(), {'error': 'Invalid car ID'})

    @patch('app.mongo.db.cars')
    def test_get_car_info_notfound(self,mock_cars):
        mock_find_one=mock_cars.find_one
        mock_find_one.return_value = None

        response = self.app.get('/car/61887a273b63c8c4cfcdb0e0')

        self.assertEqual(response.get_json(),{'error': 'Car not found'})

if __name__ == '__main__':
    unittest.main()
