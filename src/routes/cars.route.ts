import { Router } from 'express';
import CarService from '../services/car.service';
import CarModel from '../models/Car.model';
import CarController from '../controllers/Car.controller';
import CarValidation from '../validations/car.validation';

const router = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);
const carValidation = new CarValidation();

router.post('/', carValidation.validate, (req, res) => carController.create(req, res));

export default router;
