import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders student records management system', () => {
  render(<App />);
  const titleElement = screen.getByText(/Student Records Management System/i);
  expect(titleElement).toBeInTheDocument();
}); 