const { expect } = require('chai');
const sinon = require('sinon');
const { signup, login } = require('../controllers/authController');
const User = require('../models/User');

describe('Auth Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Signup', () => {
    it('should create a new user and return a token', async () => {
      req.body = { username: 'testuser', email: 'test@test.com', password: 'password123' };
      
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves({
        id: '1',
        username: 'testuser',
        email: 'test@test.com'
      });

      await signup(req, res, next);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.have.property('success', true);
      expect(res.json.firstCall.args[0]).to.have.property('token');
    });

    it('should throw an error if user already exists', async () => {
      req.body = { email: 'existing@test.com' };
      
      sinon.stub(User, 'findOne').resolves({ id: '1' });

      await signup(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(next.firstCall.args[0].message).to.equal('User already exists');
      expect(next.firstCall.args[0].status).to.equal(400);
    });
  });

  describe('Login', () => {
    it('should login an existing user and return a token', async () => {
      req.body = { email: 'test@test.com', password: 'password123' };
      
      const userMock = {
        id: '1',
        username: 'testuser',
        email: 'test@test.com',
        matchPassword: sinon.stub().resolves(true)
      };

      sinon.stub(User, 'findOne').resolves(userMock);

      await login(req, res, next);

      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.have.property('success', true);
      expect(res.json.firstCall.args[0]).to.have.property('token');
    });

    it('should throw an error for invalid credentials', async () => {
      req.body = { email: 'test@test.com', password: 'wrongpassword' };
      
      const userMock = {
        matchPassword: sinon.stub().resolves(false)
      };

      sinon.stub(User, 'findOne').resolves(userMock);

      await login(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(next.firstCall.args[0].message).to.equal('Invalid email or password');
      expect(next.firstCall.args[0].status).to.equal(401);
    });
  });
});
