import unittest
from unittest.mock import patch
from flask import Flask
from app import app

class GetCarsTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    
    def test_get_cars_success(self):
     with patch('app.mongo.db.cars') as mock_cars:
   
        mock_cars.find.return_value = [
            {
                '_id': '123',
                'make': 'Toyota',
                'model': 'Camry',
                'year': 2020,
                'price': 25000,
                'color': 'Silver',
                'image': 'car1.jpg'
            },
            {
                '_id': '456',
                'make': 'Honda',
                'model': 'Accord',
                'year': 2021,
                'price': 27000,
                'color': 'White',
                'image': 'car2.jpg'
            }
        ]

        response = self.app.get('/cars')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), [
            {
                'id': '123',
                'make': 'Toyota',
                'model': 'Camry',
                'year': 2020,
                'price': 25000,
                'color': 'Silver',
                'image': 'car1.jpg'
            },
            {
                'id': '456',
                'make': 'Honda',
                'model': 'Accord',
                'year': 2021,
                'price': 27000,
                'color': 'White',
                'image': 'car2.jpg'
            }
        ])


    def test_get_cars_empty(self):
     with patch('app.mongo.db.cars') as mock_cars:

        mock_cars.find.return_value = []

        response = self.app.get('/cars')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {'error': 'No cars found in database'})

if __name__ == '__main__':
    unittest.main()
