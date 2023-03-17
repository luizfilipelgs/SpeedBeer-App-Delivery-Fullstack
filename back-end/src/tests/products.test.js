const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const ProductsModel = require('../database/models').Products;
const app = require('../api/app');
const { expectedResponse } = require('./mocks/products.mock');
const { expect } = chai;

chai.use(chaiHttp);

describe('Testes da rota /products', () => {
  describe('Casos GET', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });
  
    afterEach(() => {
      sandbox.restore();
    });
    it('Deve retornar um status 200 e todos os produtos', async () => {

      const productsServiceStub = sandbox.stub(ProductsModel, 'findAll').resolves(expectedResponse);

      const res = await chai.request(app).get('/products');

      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(expectedResponse);

      productsServiceStub.restore();
    });

    it('Deve retornar um status 500 caso haja algum erro inesperado', async () => {
      const errorMessage = 'Internal Server Error';
      sandbox.stub(ProductsModel, 'findAll').throws(new Error(errorMessage));

      const res = await chai.request(app).get(`/products`);

      expect(res).to.have.status(500);
      expect(res.body).to.deep.equal('Internal Server Error');
    });
  });
});