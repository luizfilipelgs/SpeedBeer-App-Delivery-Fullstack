const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const SaleModel = require('../database/models').Sales;
const SalesProductsModel = require('../database/models').SalesProducts;
const UserModel = require('../database/models').User;
const ProductModel = require('../database/models').Products;
const { expect } = chai;
const jwt = require('jsonwebtoken');
const { sellers, newSale, WithoutUserId, WithoutUserIdSeller, saleDetails, WithoutUserIdAdress, WithoutNumber, WithoutTotalPrice } = require('./mocks/sale.mock');

chai.use(chaiHttp);

describe('Testes da rota /sales', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Casos POST /sales/register', () => {
    it('Deve retornar um status 200 ao registrar uma venda com sucesso', async () => {
      sandbox.stub(jwt, 'verify').returns({ id: 0 });
      sandbox.stub(SaleModel, 'create').resolves({ id: 1 });
      sandbox.stub(SalesProductsModel, 'bulkCreate').resolves();
      const response = await chai.request(app)
      .post('/sales/register')
      .send(newSale);

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal({ id: 1 });
    });

    it('Deve retornar um status 401 ao registrar uma venda sem token', async () => {
      sandbox.stub(SaleModel, 'create').resolves({ id: 1 });
      sandbox.stub(SalesProductsModel, 'bulkCreate').resolves();
      const response = await chai.request(app).post('/sales/register').send(newSale);

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal('Expired or invalid token');
    });

    it('Deve retornar um status 400 ao não enviar o campo userId no registro de uma nova venda', async () => {
      const msgError = 'o campo userId é necessário, o valor recebido desse campo foi null';
      sandbox.stub(jwt, 'verify').returns({ id: 0 });
      const response = await chai.request(app)
      .post('/sales/register')
      .send(WithoutUserId);

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal(msgError);
    });

    it('Deve retornar um status 400 ao não enviar o campo sellerId no registro de uma nova venda', async () => {
      const msgError = 'o campo sellerId é necessário, o valor recebido desse campo foi null';
      sandbox.stub(jwt, 'verify').returns({ id: 0 });
      const response = await chai.request(app)
      .post('/sales/register')
      .send(WithoutUserIdSeller);

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal(msgError);
    });

    it('Deve retornar um status 400 ao não enviar o campo deliveryAddress no registro de uma nova venda', async () => {
      const msgError = 'o campo deliveryAddress é necessário, o valor recebido desse campo foi null';
      sandbox.stub(jwt, 'verify').returns({ id: 0 });
      const response = await chai.request(app)
      .post('/sales/register')
      .send(WithoutUserIdAdress);

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal(msgError);
    });

    it('Deve retornar um status 400 ao não enviar o campo deliveryNumber no registro de uma nova venda', async () => {
      const msgError = 'o campo deliveryNumber é necessário, o valor recebido desse campo foi null';
      sandbox.stub(jwt, 'verify').returns({ id: 0 });
      const response = await chai.request(app)
      .post('/sales/register')
      .send(WithoutNumber);

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal(msgError);
    });

    it('Deve retornar um status 400 ao não enviar o campo totalPrice no registro de uma nova venda', async () => {
      const msgError = 'o campo totalPrice é necessário, o valor recebido desse campo foi null';
      sandbox.stub(jwt, 'verify').returns({ id: 0 });
      const response = await chai.request(app)
      .post('/sales/register')
      .send(WithoutTotalPrice);

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal(msgError);
    });
  });

  describe('Casos GET /orders/:id', () => {
    it('Deve retornar um status lista de pedidos do usuário', async () => {
      const userId = '123';
      const expectedResponse = [{ id: 1, product: 'camisa', quantity: 2 }];
      sandbox.stub(SaleModel, 'findAll').resolves(expectedResponse);

      const response = await chai.request(app).get(`/sales/orders/${userId}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(expectedResponse);

      SaleModel.findAll.restore();
    });

    it('Deve retornar um status 500 em caso de erro no servidor', async () => {
      const userId = '123';
      sandbox.stub(SaleModel, 'findAll').throws();

      const response = await chai.request(app).get(`/sales/orders/${userId}`);

      expect(response.status).to.equal(500);
      expect(response.body).to.deep.equal('Error');

      SaleModel.findAll.restore();
    });
  });

  describe('Casos GET /seller/:id', () => {
    it('Deve retornar um status 200 as vendas do vendedor', async () => {
      const expectedSales = [{ id: 1, userId: 1, sellerId: 1, deliveryNumber: 3333333333, deliveryAddress: 'caminho',  totalPrice: 10.0 }, { id: 2, userId: 1, sellerId: 1,deliveryNumber: 4444444444, deliveryAddress: 'caminho', totalPrice: 20.0 }];
      sandbox.stub(SaleModel, 'findAll').resolves(expectedSales);

      const response = await chai.request(app).get(`/sales/seller/1`);
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(expectedSales);
    });

    it('Deve retornar um status 500 de erro INTERNAL_SERVER_ERROR em caso de falha ao buscar as vendas', async () => {
      const expectedError = 'Erro interno do servidor';
      sandbox.stub(SaleModel, 'findAll').rejects(new Error('Erro interno do servidor'));

      const response = await chai.request(app).get(`/sales/seller/1`);
      expect(response.status).to.equal(500);
      expect(response.body).to.deep.equal(expectedError);
    });
  });

  describe('Casos PUT /status/:id', () => {
    it('Deve retornar um status 202 ao atualizar o status de uma venda', async () => {
      const newStatus = 'Pendente';
      const response = await chai
        .request(app)
        .put(`/sales/status/1`)
        .send({ newStatus });

      expect(response.status).to.be.equal(202);
      expect(response.body).to.be.equal('Status updated');
    });

    it('Deve retornar um status 400 ao atualizar com um status inexistente em uma venda', async () => {
      const newStatus = 'Teste';
      const response = await chai
        .request(app)
        .put(`/sales/status/1`)
        .send({ newStatus });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.equal('Invalid status');
    });

    it('should return a 500 error if the database operation fails', async () => {
      const errorMessage = 'Internal Server Error';
      const newStatus = 'Pendente';
      sandbox.stub(SaleModel, 'update').throws(new Error(errorMessage));

      const res = await chai.request(app)
      .put(`/sales/status/1`)
      .send({ newStatus });

      expect(res).to.have.status(500);
      expect(res.body).to.deep.equal('Internal Server Error');
    });
  });

  describe('Casos GET /seller', () => {
    it('Deve retornar um status 200 e uma lista de vendedores', async () => {
      const response = await chai.request(app).get('/sales/seller');

      expect(response.status).to.be.equals(200);
      expect(response.body).to.be.deep.equal(sellers)
    });

    it('Deve retornar um status 500 e uma mensagem de erro quando houver um erro no serviço', async () => {
      const errorMessage = 'Internal Server Error';
      sandbox.stub(UserModel, 'findAll').rejects((new Error(errorMessage)));
      const response = await chai.request(app).get('/sales/seller');

      expect(response.status).to.be.equal(500);
      expect(response.body).to.be.equal(errorMessage);
    });
  });

  describe('Casos GET /orders/details/:saleId', () => {
    it('Deve retornar um status 200 e os detalhes da venda', async () => {
      const saleId = 1;
      sandbox.stub(SaleModel, 'findByPk').resolves(saleDetails);
      const res = await chai.request(app).get(`/sales/orders/details/${saleId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(saleDetails);
      sandbox.assert.calledOnceWithExactly(SaleModel.findByPk, saleId, {
        include: [
          { model: UserModel, as: 'seller', attributes: ['id', 'name'] },
          { model: ProductModel, as: 'products', through: { attributes: ['quantity'] } },
        ],
      });
    });
    
    it('Deve retornar um status 500 caso haja algum erro inesperado', async () => {
      const saleId = 1;
      const errorMessage = 'Internal Server Error';
      sandbox.stub(SaleModel, 'findByPk').throws(new Error(errorMessage));
      const res = await chai.request(app).get(`/sales/orders/details/${saleId}`);

      expect(res).to.have.status(500);
      expect(res.body).to.deep.equal('Internal Server Error');
    });
  });
});
