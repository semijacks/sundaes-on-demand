import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('initial conditions of button and checkbox', () => {
  render(<SummaryForm />);

  const button = screen.getByRole('button', {
    Name: /confirm order/i,
  });
  expect(button).toBeDisabled();

  const checkbox = screen.getByRole('checkbox', {
    Name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();
});

test('checkbox enables button on first click and disables on second', () => {
  render(<SummaryForm />);

  const button = screen.getByRole('button', {
    Name: /confirm order/i,
  });

  const checkbox = screen.getByRole('checkbox', {
    Name: /i agree to terms and conditions/i,
  });

  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(button).toBeEnabled();

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});
