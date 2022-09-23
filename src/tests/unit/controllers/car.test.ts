import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import * as mock from '../../mock/carMock';
import CarController from '../../../controllers/Car.controller';
import CarService from '../../../services/car.service';
import CarModel from '../../../models/Car.model';


describe('Car Controller', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  // fazemos o cast de um objeto para um `Request` pois nosso controller só vai aceitar um objeto do tipo `Request` como primeiro parâmetro
  const req = {} as Request;
  // o mesmo acontece com o segundo parâmetro
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(mock.validCar);
    sinon.stub(carService, 'readOne').resolves(mock.validCar);
    sinon.stub(carService, 'read').resolves(mock.arrCar);
    sinon.stub(carService, 'update').resolves(mock.updatedCar);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create Car', () => {
    it('Success', async () => {
      req.body = mock.validCar;
      await carController.create(req, res);
      // o cast de `res.status` é feito pois `res` foi criado como do tipo `Resquest` 
      // e agora, que queremos validar com o que foi chamado, precisar ser tratado como um `sinon.SinonStub`
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(mock.validCar)).to.be.true;
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      // como fizemos o dublê da service o valor do `req.params.id` não vai chegar na model
      // logo ele só precisa ser um string e existir
      req.params = { id: mock.validCarWithID._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(mock.validCar)).to.be.true;
    });
  });

  describe('Read Car', () => {
    it('Success', async () => {
      // como fizemos o dublê da service o valor do `req.params.id` não vai chegar na model
      // logo ele só precisa ser um string e existir
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(mock.validCar)).to.be.true;
    });
  });

  describe('Update Car', () => {
    it('Success', async () => {
      // como fizemos o dublê da service o valor do `req.params.id` não vai chegar na model
      // logo ele só precisa ser um string e existir
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(mock.validCar)).to.be.true;
    });
  });
});
