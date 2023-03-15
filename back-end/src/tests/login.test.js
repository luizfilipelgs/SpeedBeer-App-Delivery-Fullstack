const sinon = require('sinon');
const chai = require('chai');
const UserModel = require('../database/models').User;
const app = require('../api/app');
const { expect } = chai;
const chaiHttp = require('chai-http');
const { userMocks, validLogin, loginWithoutEmail, loginWithoutPass,
   wrongPass, wrongEmail } = require('./mocks/login.mock');
chai.use(chaiHttp);

describe('Testes da rota /login', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });
  describe('Casos Post', () => {
    it('Deve retornar um status 200 e um token ao fazer login com sucesso', async () => {
      sandbox.stub(UserModel, 'findOne').resolves(userMocks);
      const response = await chai
      .request(app).post('/login')
      .send(validLogin);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('token')
    }); 

    it('Deve retornar um status 400 caso o email não seja fornecido', async () => {
      const response = await chai
      .request(app).post('/login')
      .send(loginWithoutEmail);

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.equal('Todos os campos devem ser preenchidos');
    });

    it('Deve retornar um status 400 caso a senha não seja fornecido', async () => {
      const response = await chai
      .request(app)
      .post('/login')
      .send(loginWithoutPass);

      expect(response.status).to.be.equal(400);
      expect(response.body).to.deep.equal('Todos os campos devem ser preenchidos')
    });

    it('Deve retornar um status 401 caso a senha ou email estejam incorretos', async () => {
      const MSG_ERROR = 'Email ou senha Incorretos';
      sandbox.stub(UserModel, 'findOne').resolves(userMocks);
      const response = await chai
      .request(app)
      .post('/login')
      .send(wrongPass);

      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal(MSG_ERROR)
    });

    it('Deve retornar um status 500 caso haja algum erro inesperado', async () => {
      const errorMessage = 'Internal Server Error';
      sandbox.stub(UserModel, 'findOne').rejects(new Error(errorMessage));
      const response = await chai.request(app).post(`/login`).send(validLogin);

      expect(response.status).to.be.equal(500);
      expect(response.body).to.deep.equal('Internal Server Error');
    });

    it('Deve retornar um status 401 caso seja enviado um email inválido', async () => {
      const response = await chai.request(app).post(`/login`).send(wrongEmail);
      
      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal('Formato de Email ou senha Invalidos');
    });
  });
});