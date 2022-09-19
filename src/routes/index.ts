import express from 'express';
import carRoute from './cars.route';

const router = express.Router();

router.use('/cars', carRoute);

export default router;
