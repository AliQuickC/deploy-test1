import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('Show modal Uncontrolled components Form', async () => {
  render(<App />);

  expect(screen.getByTestId('app')).toBeInTheDocument();
});
