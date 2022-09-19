import { Router } from 'express'
import CarService from '../services/car.service'
import CarModel from '../models/Car.model'
import CarController from '../controllers/Car.controller'
const router = Router()

const car = new CarModel()
const carService = new CarService(car);
const carController = new CarController(carService)

router.post('/', (req, res) => carController.create(req, res))

export default router;
