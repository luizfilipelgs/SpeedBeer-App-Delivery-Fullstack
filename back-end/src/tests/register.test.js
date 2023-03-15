const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { registerMocks, validRegister, registerWithoutName, registerWithoutEmail,
  registerWithoutPass, newUserMock, registerDuplicate, validRegisterAdm, registerDuplicateAdm } = require('./mocks/register.mock');
const UserModel = require('../database/models').User;

chai.use(chaiHttp);

describe('Testes da rota /register', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });
  
  describe('Casos POST', () => {
    it('Deve retornar um status 201 e um token ao registrar um novo usuário com sucesso', async () => {
      sandbox.stub(UserModel, 'findAll').resolves([]);
      sandbox.stub(UserModel, 'create').resolves(newUserMock);
      const response = await chai
        .request(app)
        .post('/register')
        .send(validRegister);

      expect(response.status).to.be.equal(201);
      expect(response.body).to.have.property('token');
    });

    it('Deve retornar um status 401 caso o nome não seja fornecido', async () => {
      const response = await chai
        .request(app)
        .post('/register')
        .send(registerWithoutName);

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.equal('Formato de Email ou senha Invalidos');
    });

    it('Deve retornar um status 401 caso o email não seja fornecido', async () => {
      const response = await chai
        .request(app)
        .post('/register')
        .send(registerWithoutEmail);

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.equal('Formato de Email ou senha Invalidos');
    });

    it('Deve retornar um status 401 caso a senha não seja fornecido', async () => {
      const response = await chai
        .request(app)
        .post('/register')
        .send(registerWithoutPass);

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.equal('Formato de Email ou senha Invalidos');
    });

    it('Deve retornar um status 401 caso haja algum erro na criação do usuário', async () => {
      sandbox.stub(UserModel, 'findAll').resolves([]);
      sandbox.stub(UserModel, 'create').resolves(null);
      const response = await chai
        .request(app)
        .post('/register')
        .send(registerMocks.user);
    
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.equal('Erro ao cadastrar usuário');
    });

    it('Deve retornar um status 409 caso o nome já esteja em uso', async () => {
      sandbox.stub(UserModel, 'findAll').resolves([0]);
      const response = await chai
        .request(app)
        .post('/register')
        .send(registerDuplicate.user);
    
      expect(response.status).to.be.equal(409);
      expect(response.body).to.be.equal('Nome de usuário ja existe');
    });
    
    it('Deve retornar um status 409 caso o email já esteja em uso', async () => {
      sandbox.stub(UserModel, 'findAll').resolves([]);
      const response = await chai
        .request(app)
        .post('/register')
        .send(registerDuplicate.user);
    
      expect(response.status).to.be.equal(409);
      expect(response.body).to.be.equal('Email ja está cadastrado');
    });

    it('Deve retornar um status 500 caso haja algum erro inesperado', async () => {
      const errorMessage = 'Internal Server Error';
      sandbox.stub(UserModel, 'findAll').throws(new Error(errorMessage));
      const res = await chai.request(app).post(`/register`).send(validRegister);

      expect(res).to.have.status(500);
      expect(res.body).to.deep.equal('Internal Server Error');
    });
  });
  describe('Casos POST /admin', () => {
    it('Deve retornar um status 201 e um token ao registrar um novo usuário com sucesso', async () => {
      sandbox.stub(UserModel, 'findOne').resolves(null);
      sandbox.stub(UserModel, 'create').resolves(newUserMock);
      const response = await chai
        .request(app)
        .post('/register/admin')
        .send(validRegisterAdm);

      expect(response.status).to.be.equal(201);
      expect(response.body).to.have.property('token');
    });

    it('Deve retornar um status 409 caso o nome já esteja em uso', async () => {
      const response = await chai
        .request(app)
        .post('/register/admin')
        .send(registerDuplicateAdm);
    
      expect(response.status).to.be.equal(409);
      expect(response.body).to.be.equal('Usuário já existe');
    });

    it('Deve retornar um status 409 caso o email já esteja em uso', async () => {
      sandbox.stub(UserModel, 'findOne').resolves(null);
      const response = await chai
        .request(app)
        .post('/register/admin')
        .send(registerDuplicateAdm);
    
      expect(response.status).to.be.equal(409);
      expect(response.body).to.be.equal('Email ja está cadastrado');
    });

    it('Deve retornar um status 401 caso haja algum erro ao cadastrar o usuário', async () => {
      sandbox.stub(UserModel, 'findOne').resolves(null);
      sandbox.stub(UserModel, 'create').resolves(null);
      const response = await chai
        .request(app)
        .post('/register/admin')
        .send(validRegisterAdm);
    
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.equal('Erro ao cadastrar usuário');
    });

    it('Deve retornar um status 401 caso haja algum erro ao cadastrar o usuário', async () => {
      const response = await chai
        .request(app)
        .post('/register/admin')
        .send(registerDuplicate.user);
    
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.equal('Formato dos campos Inválidos');
    });

    it('Deve retornar um status 500 caso haja algum erro inesperado', async () => {
      const errorMessage = 'Internal Server Error';
      sandbox.stub(UserModel, 'findOne').throws(new Error(errorMessage));
      const response = await chai.request(app).post(`/register/admin`).send(validRegisterAdm);

      expect(response.status).to.be.equal(500);
      expect(response.body).to.deep.equal('Internal Server Error');
    });
  });
});