import About from '../pages/About';

const { screen, render } = require('@testing-library/react');

test('se a página contém as informações sobre a Pokédex', () => {
  render(<About />);
  const descrição = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
  expect(descrição).toBeInTheDocument();
});

test('se a página contém um heading h2 com o texto About Pokédex', () => {
  render(<About />);
  const heading2 = screen.getByText('About Pokédex');
  expect(heading2).toBeInTheDocument();
});

test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  render(<About />);
  const paragrafoPokedex1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
  const paragrafoPokedex2 = screen.getByText('One can filter Pokémons by type, and see more details for each one of them');
  expect(paragrafoPokedex1).toBeInTheDocument();
  expect(paragrafoPokedex2).toBeInTheDocument();
});

test('se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
  render(<About />);
  const imagem = screen.getByRole('img');
  expect(imagem).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
