import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Home from './route';

test('Show modal Uncontrolled components Form', async () => {
  render(<Home />);

  expect(screen.getByTestId('home')).toBeInTheDocument();
});
