import React from 'react';
import './NoteCard.css';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Strip HTML for the preview text
  const getPreview = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html || '';
    const text = div.textContent || div.innerText || '';
    return text.length > 120 ? text.substring(0, 120) + '...' : text;
  };

  return (
    <div className="note-card">
      <div className="note-card-header">
        <h3 className="note-card-title">{note.title}</h3>
        <span className="note-card-date">{formatDate(note.updatedAt)}</span>
      </div>
      <p className="note-card-preview">{getPreview(note.content)}</p>
      <div className="note-card-actions">
        <button className="btn-edit" onClick={() => onEdit(note.id)}>
          ✏️ Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(note.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
