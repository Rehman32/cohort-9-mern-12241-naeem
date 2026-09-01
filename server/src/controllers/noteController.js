const Note = require('../models/Note');

// @desc    Get all notes for a user
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.findAll({
      where: { userId: req.user.id },
      order: [['updatedAt', 'DESC']],
    });
    res.json({ success: true, notes });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    
    if (!title) {
      const err = new Error('Please provide a title');
      err.status = 400;
      throw err;
    }

    const note = await Note.create({
      title,
      content,
      userId: req.user.id
    });

    res.status(201).json({ success: true, note });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Private
const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!note) {
      const err = new Error('Note not found');
      err.status = 404;
      throw err;
    }

    res.json({ success: true, note });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    
    let note = await Note.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!note) {
      const err = new Error('Note not found');
      err.status = 404;
      throw err;
    }

    note.title = title || note.title;
    note.content = content !== undefined ? content : note.content;
    
    await note.save();

    res.json({ success: true, note });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!note) {
      const err = new Error('Note not found');
      err.status = 404;
      throw err;
    }

    await note.destroy();

    res.json({ success: true, message: 'Note removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote
};
