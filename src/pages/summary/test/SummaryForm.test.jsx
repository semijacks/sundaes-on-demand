import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

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

  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(button).toBeEnabled();

  userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test('popover responds to hover', async () => {
  render(<SummaryForm />);

  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
