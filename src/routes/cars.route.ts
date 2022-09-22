import { Router } from 'express';
import CarService from '../services/car.service';
import CarModel from '../models/Car.model';
import CarController from '../controllers/Car.controller';
import CarValidation from '../validations/car.validation';

const router = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);
const carValidation = new CarValidation();

router.post('/', carValidation.validate, (req, res) => carController.create(req, res));
router.put(
  '/:id',
  carValidation.idValidation,
  carValidation.bodyValidation,
  (req, res) => carController.update(req, res),
);
router.delete('/:id', carValidation.idValidation, (req, res) => carController.delete(req, res));
router.get('/:id', carValidation.idValidation, (req, res) => carController.readOne(req, res));
router.get('/', (req, res) => carController.read(req, res));

export default router;
