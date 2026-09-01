import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../context/NotesContext';
import './Dashboard.css';

const Dashboard = () => {
  const { notes, loading, error, fetchNotes, deleteNote } = useNotes();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleEdit = (id) => {
    navigate(`/editor/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
      } catch (err) {
        // Error handled in context
      }
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>My Notes</h1>
          <button
            className="btn-new-note"
            onClick={() => navigate('/editor/new')}
          >
            + New Note
          </button>
        </div>

        {error && <div className="dashboard-error">{error}</div>}

        {loading ? (
          <div className="dashboard-loading">
            <div className="spinner"></div>
            <p>Loading your notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="dashboard-empty">
            <span className="empty-icon">📝</span>
            <h2>No notes yet</h2>
            <p>Create your first note to get started!</p>
            <button
              className="btn-new-note"
              onClick={() => navigate('/editor/new')}
            >
              + Create Note
            </button>
          </div>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
