import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/car.service';
import * as mock from '../../mock/carMock';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(mock.validCarWithID);
    sinon.stub(carModel, 'readOne')
      // na chamada de index 0 `carModel.readOne` vai responder um fakeCar
      .onCall(0).resolves(mock.validCarWithID)
      // já na próxima chamada ele vai mudar seu retorno, isso pode ser feito várias vezes
      .onCall(1).resolves(null);
  })
  after(() => {
    sinon.restore()
  })
  describe('Create Car', () => {
    it('Success', async () => {
      const carCreated = await carService.create(mock.validCar);

      expect(carCreated).to.be.deep.equal(mock.validCarWithID);
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      const carCreated = await carService.readOne(mock.validCarWithID._id);

      expect(carCreated).to.be.deep.equal(mock.validCarWithID);
    });

  });
});
