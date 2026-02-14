import { render, screen } from '@testing-library/react';
import App from './App';

test('renders valentine question', () => {
  render(<App />);
  const title = screen.getByRole('heading', {
    name: 'Міла, чи будеш ти моєю валентинкою?',
  });
  expect(title).toBeInTheDocument();
});
