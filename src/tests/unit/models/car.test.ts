import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car.model';
import { Model } from 'mongoose';
import * as mock from '../../mock/carMock';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(mock.validCarWithID);
    sinon.stub(Model, 'findOne').resolves(mock.validCarWithID);
  });

  after(() => {
    sinon.restore();
  });

  describe('creating a car', () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(mock.validCar);
      expect(newCar).to.be.deep.equal(mock.validCarWithID);
    });
  });

  describe('searching a car', () => {
    it('successfully found', async () => {
      const carsFound = await carModel.readOne('62cf1fc6498565d94eba52cd');
      expect(carsFound).to.be.deep.equal(mock.validCarWithID);
    });

    it('_id not found', async () => {
      try {
        await carModel.readOne('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

});
