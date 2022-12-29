import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testando o componente <Pokedex.js />', () => {
  test('Se a página contém um heading h2 com o texto Encountered pokémons', () => {
    const isPokemonFavoriteById = [25, 4, 10, 23, 65, 151, 78, 143, 148];
    renderWithRouter(
      <App pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const heading2 = screen.getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(heading2).toBeInTheDocument();
  });

  test('Se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    const isPokemonFavoriteById = [25, 4, 10, 23, 65, 151, 78, 143, 148];
    renderWithRouter(
      <App pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(button);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    userEvent.click(button);
    expect(screen.getByText('Caterpie')).toBeInTheDocument();
    userEvent.click(button);
    expect(screen.getByText('Ekans')).toBeInTheDocument();
    userEvent.click(button);
    expect(screen.getByText('Alakazam')).toBeInTheDocument();
    userEvent.click(button);
    expect(screen.getByText('Mew')).toBeInTheDocument();
    userEvent.click(button);
    expect(screen.getByText('Rapidash')).toBeInTheDocument();
    userEvent.click(button);
    expect(screen.getByText('Snorlax')).toBeInTheDocument();
    userEvent.click(button);
    expect(screen.getByText('Dragonair')).toBeInTheDocument();
    userEvent.click(button);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  test('Se é mostrado apenas um pokémon por vez', () => {
    const isPokemonFavoriteById = [25, 4, 10, 23, 65, 151, 78, 143, 148];
    renderWithRouter(
      <App pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkMoreDetails).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(button);
    expect(linkMoreDetails).toBeInTheDocument();
  });

  test('Se a Pokédex tem os botões de filtro', () => {
    const isPokemonFavoriteById = [25, 4, 10, 23, 65, 151, 78, 143, 148];
    renderWithRouter(
      <App pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const dataTestIDButton = screen.getAllByTestId('pokemon-type-button');
    expect(dataTestIDButton[0]).toHaveTextContent('Electric');
    expect(dataTestIDButton[1]).toHaveTextContent('Fire');
    expect(dataTestIDButton[2]).toHaveTextContent('Bug');
    expect(dataTestIDButton[3]).toHaveTextContent('Poison');
    expect(dataTestIDButton[4]).toHaveTextContent('Psychic');
    expect(dataTestIDButton[5]).toHaveTextContent('Normal');
    expect(dataTestIDButton[6]).toHaveTextContent('Dragon');

    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    const dataTestIdType = screen.getAllByTestId('pokemon-type');
    userEvent.click(dataTestIDButton[0]);
    expect(dataTestIdType[0]).toHaveTextContent('Electric');
    userEvent.click(button);
    expect(dataTestIdType[0]).toHaveTextContent('Electric');
    userEvent.click(dataTestIDButton[1]);
    expect(dataTestIdType[0]).toHaveTextContent('Fire');
    userEvent.click(button);
    expect(dataTestIdType[0]).toHaveTextContent('Fire');
    userEvent.click(dataTestIDButton[2]);
    expect(dataTestIdType[0]).toHaveTextContent('Bug');
    userEvent.click(button);
    expect(dataTestIdType[0]).toHaveTextContent('Bug');
    userEvent.click(dataTestIDButton[3]);
    expect(dataTestIdType[0]).toHaveTextContent('Poison');
    userEvent.click(button);
    expect(dataTestIdType[0]).toHaveTextContent('Poison');
    userEvent.click(dataTestIDButton[4]);
    expect(dataTestIdType[0]).toHaveTextContent('Psychic');
    userEvent.click(button);
    expect(dataTestIdType[0]).toHaveTextContent('Psychic');
    userEvent.click(dataTestIDButton[5]);
    expect(dataTestIdType[0]).toHaveTextContent('Normal');
    userEvent.click(button);
    expect(dataTestIdType[0]).toHaveTextContent('Normal');
    userEvent.click(dataTestIDButton[6]);
    expect(dataTestIdType[0]).toHaveTextContent('Dragon');
    userEvent.click(button);
    expect(dataTestIdType[0]).toHaveTextContent('Dragon');
    const All = screen.getByText('All');
    expect(All).toBeVisible();
  });
  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    const isPokemonFavoriteById = [25, 4, 10, 23, 65, 151, 78, 143, 148];
    renderWithRouter(
      <App pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const buttonAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(buttonAll);
    const dataTestIdType = screen.getAllByTestId('pokemon-type');
    expect(dataTestIdType[0]).toHaveTextContent('Electric');
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(button);
    expect(dataTestIdType[0]).toHaveTextContent('Fire');
    userEvent.click(button);
    expect(dataTestIdType[0]).toHaveTextContent('Bug');
  });
});
