import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

const pokemon = pokemons[0];
const pokemon25 = '/pokemons/25';

describe('Testando o componente <Pokemon.js />', () => {
  test('Se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(
      <App pokemons={ pokemons } pokemon={ pokemon } />,
    );
    const dataTestIdNome = screen.getAllByTestId('pokemon-name');
    expect(dataTestIdNome[0]).toHaveTextContent('Pikachu');

    const dataTestIdType = screen.getAllByTestId('pokemon-type');
    expect(dataTestIdType[0]).toHaveTextContent('Electric');

    const dataTestIdWeight = screen.getAllByTestId('pokemon-weight');
    expect(dataTestIdWeight[0]).toHaveTextContent('Average weight: 6.0 kg');

    const imgagemPokemon = screen.getByAltText('Pikachu sprite');
    expect(imgagemPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Se o card do pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste pokémon', () => {
    renderWithRouter(
      <App pokemons={ pokemons } pokemon={ pokemon } />,
    );
    const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkMoreDetails).toHaveAttribute('href', pokemon25);
  });

  test('Se ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes de pokémon e também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(
      <App pokemons={ pokemons } pokemon={ pokemon } />,
    );
    const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkMoreDetails);
    act(() => history.push(pokemon25));
    expect(history.location.pathname).toBe(pokemon25);
  });

  test('Se existe um ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(
      <App
        pokemons={ pokemons }
        pokemon={ pokemon }
        isFavorite
      />,
    );
    const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkMoreDetails);
    act(() => history.push(pokemon25));
    expect(history.location.pathname).toBe(pokemon25);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const iconeStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(iconeStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
