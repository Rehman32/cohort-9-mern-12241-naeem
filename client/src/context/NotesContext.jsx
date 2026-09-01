import React, { createContext, useState, useContext } from 'react';
import api from '../api/axios';

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/notes');
      setNotes(response.data.notes);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (noteData) => {
    setError(null);
    try {
      const response = await api.post('/notes', noteData);
      setNotes((prev) => [response.data.note, ...prev]);
      return response.data.note;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create note');
      throw err;
    }
  };

  const updateNote = async (id, noteData) => {
    setError(null);
    try {
      const response = await api.put(`/notes/${id}`, noteData);
      setNotes((prev) =>
        prev.map((note) => (note.id === id ? response.data.note : note))
      );
      return response.data.note;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update note');
      throw err;
    }
  };

  const deleteNote = async (id) => {
    setError(null);
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete note');
      throw err;
    }
  };

  const getNoteById = async (id) => {
    setError(null);
    try {
      const response = await api.get(`/notes/${id}`);
      return response.data.note;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch note');
      throw err;
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        error,
        fetchNotes,
        createNote,
        updateNote,
        deleteNote,
        getNoteById,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
