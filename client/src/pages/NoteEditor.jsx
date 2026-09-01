import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Navbar from '../components/Navbar';
import { useNotes } from '../context/NotesContext';
import './NoteEditor.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['link'],
    ['clean'],
  ],
};

const NoteEditor = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const { createNote, updateNote, getNoteById } = useNotes();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [loadingNote, setLoadingNote] = useState(false);

  useEffect(() => {
    if (!isNew) {
      setLoadingNote(true);
      getNoteById(id)
        .then((note) => {
          setTitle(note.title);
          setContent(note.content || '');
        })
        .catch(() => {
          navigate('/dashboard');
        })
        .finally(() => setLoadingNote(false));
    }
  }, [id]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please provide a title for your note.');
      return;
    }
    setSaving(true);
    try {
      if (isNew) {
        await createNote({ title, content });
      } else {
        await updateNote(id, { title, content });
      }
      navigate('/dashboard');
    } catch (err) {
      // Error handled in context
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (loadingNote) {
    return (
      <div className="editor-layout">
        <Navbar />
        <div className="editor-loading">
          <div className="spinner"></div>
          <p>Loading note...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-layout">
      <Navbar />
      <div className="editor-container">
        <div className="editor-header">
          <h1>{isNew ? 'Create New Note' : 'Edit Note'}</h1>
          <div className="editor-actions">
            <button className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button
              className="btn-save"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Note'}
            </button>
          </div>
        </div>

        <div className="editor-form">
          <input
            type="text"
            className="editor-title-input"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="editor-quill-wrapper">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              placeholder="Start writing your note..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
