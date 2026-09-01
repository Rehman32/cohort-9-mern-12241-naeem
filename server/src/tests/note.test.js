const { expect } = require('chai');
const sinon = require('sinon');
const { getNotes, createNote, deleteNote } = require('../controllers/noteController');
const Note = require('../models/Note');

describe('Note Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { 
      user: { id: 'user-1' },
      body: {},
      params: {}
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('createNote', () => {
    it('should create a note for the authenticated user', async () => {
      req.body = { title: 'Test Note', content: 'Test Content' };
      
      const noteMock = {
        id: '1',
        title: 'Test Note',
        content: 'Test Content',
        userId: 'user-1'
      };

      sinon.stub(Note, 'create').resolves(noteMock);

      await createNote(req, res, next);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0].success).to.be.true;
      expect(res.json.firstCall.args[0].note).to.deep.equal(noteMock);
    });

    it('should throw an error if title is missing', async () => {
      req.body = { content: 'Test Content' };
      
      await createNote(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(next.firstCall.args[0].message).to.equal('Please provide a title');
      expect(next.firstCall.args[0].status).to.equal(400);
    });
  });

  describe('getNotes', () => {
    it('should get all notes for the authenticated user', async () => {
      const notesMock = [
        { id: '1', title: 'Note 1', userId: 'user-1' },
        { id: '2', title: 'Note 2', userId: 'user-1' }
      ];

      sinon.stub(Note, 'findAll').resolves(notesMock);

      await getNotes(req, res, next);

      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0].success).to.be.true;
      expect(res.json.firstCall.args[0].notes).to.have.lengthOf(2);
    });
  });

  describe('deleteNote', () => {
    it('should delete an existing note', async () => {
      req.params = { id: '1' };
      
      const noteMock = {
        id: '1',
        userId: 'user-1',
        destroy: sinon.stub().resolves()
      };

      sinon.stub(Note, 'findOne').resolves(noteMock);

      await deleteNote(req, res, next);

      expect(noteMock.destroy.calledOnce).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0].success).to.be.true;
      expect(res.json.firstCall.args[0].message).to.equal('Note removed');
    });

    it('should return 404 if note not found', async () => {
      req.params = { id: '99' };
      
      sinon.stub(Note, 'findOne').resolves(null);

      await deleteNote(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(next.firstCall.args[0].message).to.equal('Note not found');
      expect(next.firstCall.args[0].status).to.equal(404);
    });
  });
});
