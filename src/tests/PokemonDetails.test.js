import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

const pokemon = pokemons[0];
const pokemon25 = '/pokemons/25';

describe('Testando o componente <PokemonDetails.js />', () => {
  test('Se as informações detalhadas do pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(
      <App
        pokemons={ pokemons }
        pokemon={ pokemon }
      />,
    );
    const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkMoreDetails);
    act(() => history.push(pokemon25));

    const headingDetails = screen.getByRole('heading', { level: 2, name: /Pikachu Details/i });
    expect(headingDetails).toBeInTheDocument();

    expect(linkMoreDetails).not.toBeInTheDocument();

    const headingSummary = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(headingSummary).toBeInTheDocument();

    const paragrafo = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(paragrafo).toBeInTheDocument();
  });

  test('Se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(
      <App
        pokemons={ pokemons }
        pokemon={ pokemon }
      />,
    );
    const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkMoreDetails);
    act(() => history.push(pokemon25));

    const headingDetails = screen.getByRole('heading', { level: 2, name: /Game Locations of Pikachu/i });
    expect(headingDetails).toBeInTheDocument();

    pokemon.foundAt.forEach(({ location, map }, index) => {
      const locationPokemon = screen.getByText(location);
      const mapPokemon = screen.getAllByAltText('Pikachu location');
      expect(locationPokemon).toBeInTheDocument();
      expect(mapPokemon[index]).toHaveAttribute('src', map);
    });
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(
      <App
        pokemons={ pokemons }
        pokemon={ pokemon }
      />,
    );
    const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkMoreDetails);
    act(() => history.push(pokemon25));

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    const iconeStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(iconeStar).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(iconeStar).not.toBeInTheDocument();

    const labelCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(labelCheckbox).toBeInTheDocument();
  });
});
