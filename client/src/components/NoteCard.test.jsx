import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteCard from './NoteCard';

describe('NoteCard Component', () => {
  const mockNote = {
    id: '1',
    title: 'Test Note Title',
    content: '<p>This is some test content for the note card preview.</p>',
    updatedAt: '2026-09-01T10:00:00.000Z',
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the note title', () => {
    render(<NoteCard note={mockNote} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    expect(screen.getByText('Test Note Title')).toBeInTheDocument();
  });

  it('renders a text preview stripped of HTML', () => {
    render(<NoteCard note={mockNote} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    expect(screen.getByText(/This is some test content/)).toBeInTheDocument();
  });

  it('calls onEdit with the note id when edit is clicked', () => {
    render(<NoteCard note={mockNote} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    fireEvent.click(screen.getByText(/Edit/));
    expect(mockOnEdit).toHaveBeenCalledWith('1');
  });

  it('calls onDelete with the note id when delete is clicked', () => {
    render(<NoteCard note={mockNote} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    fireEvent.click(screen.getByText(/Delete/));
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });
});
