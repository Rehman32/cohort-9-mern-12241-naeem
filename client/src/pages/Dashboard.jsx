import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../context/NotesContext';
import './Dashboard.css';

const Dashboard = () => {
  const { notes, loading, error, fetchNotes, deleteNote } = useNotes();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

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

  // Filter notes based on search term
  const filteredNotes = notes.filter((note) => {
    const term = searchTerm.toLowerCase();
    const titleMatch = note.title.toLowerCase().includes(term);
    // Strip HTML for content search
    const div = document.createElement('div');
    div.innerHTML = note.content || '';
    const plainContent = div.textContent || div.innerText || '';
    const contentMatch = plainContent.toLowerCase().includes(term);
    return titleMatch || contentMatch;
  });

  // Sort notes
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    } else if (sortBy === 'oldest') {
      return new Date(a.updatedAt) - new Date(b.updatedAt);
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

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

        {notes.length > 0 && (
          <div className="dashboard-toolbar">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="search-clear"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="title">Title A–Z</option>
            </select>
          </div>
        )}

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
        ) : sortedNotes.length === 0 ? (
          <div className="dashboard-empty">
            <span className="empty-icon">🔍</span>
            <h2>No results found</h2>
            <p>Try a different search term.</p>
          </div>
        ) : (
          <>
            {searchTerm && (
              <p className="search-results-count">
                {sortedNotes.length} note{sortedNotes.length !== 1 ? 's' : ''} found
              </p>
            )}
            <div className="notes-grid">
              {sortedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
