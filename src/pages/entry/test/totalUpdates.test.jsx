import { render, screen } from '../../../test-utils/testing-library';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType='scoops' />);

  // make sure subtotal starts out at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
  render(<Options optionType='toppings' />);

  // make sure subtotal starts out at $0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // Add M&Ms toppings and check subtotal
  const mAndMsCheckbox = await screen.findByRole('checkbox', { name: /m&ms/i });
  userEvent.click(mAndMsCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: /hot fudge/i,
  });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.5');

  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('3.00');
});

describe('grand total', () => {
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    // check that grand total start out 0.00
    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: /hot fudge/i,
    });
    userEvent.click(hotFudgeCheckbox);

    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: /hot fudge/i,
    });
    userEvent.click(hotFudgeCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if an item is removed', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: /hot fudge/i,
    });
    userEvent.click(hotFudgeCheckbox);

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    userEvent.click(hotFudgeCheckbox);
    expect(grandTotal).toHaveTextContent('4.00');

    userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
