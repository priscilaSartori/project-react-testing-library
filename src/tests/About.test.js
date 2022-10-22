import { screen, render } from '@testing-library/react';
import About from '../pages/About';

describe('Testando o componente <About.js />', () => {
  test('Se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const descrição = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons';
    expect(screen.getByText(descrição)).toBeInTheDocument();
  });

  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragrafoPokedex1 = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons';
    const paragrafoPokedex2 = 'One can filter Pokémons by type, and see more details for each one of them';
    expect(screen.getByText(paragrafoPokedex1)).toBeInTheDocument();
    expect(screen.getByText(paragrafoPokedex2)).toBeInTheDocument();
  });

  test('Se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    render(<About />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
