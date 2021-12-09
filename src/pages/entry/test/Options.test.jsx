import { render, screen } from '../../../test-utils/testing-library';

import Options from '../Options';

test('displays image for each scoop option from the server', async () => {
  render(<Options optionType='scoops' />);

  // find scoops images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of scoops images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping option from the server', async () => {
  render(<Options optionType='toppings' />);

  //find toppings images
  const toppingsImages = await screen.findAllByRole('img', {
    name: /topping$/i,
  });
  expect(toppingsImages).toHaveLength(3);

  // confirm alt text of toppings images
  const altText = toppingsImages.map((element) => element.alt);
  expect(altText).toStrictEqual([
    'M&Ms topping',
    'Hot fudge topping',
    'Cherries topping',
  ]);
});
