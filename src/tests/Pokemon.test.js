import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const { screen } = require('@testing-library/react');

const pokemon = pokemons[0];
const pokemon25 = '/pokemons/25';

test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
  renderWithRouter(
    <Pokemon pokemons={ pokemons } pokemon={ pokemon } />,
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

test('se o card do pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste pokémon', () => {
  renderWithRouter(
    <Pokemon pokemons={ pokemons } pokemon={ pokemon } />,
  );
  const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
  expect(linkMoreDetails).toHaveAttribute('href', pokemon25);
});

test('Teste se ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes de pokémon', () => {
  const { history } = renderWithRouter(
    <Pokemon pokemons={ pokemons } pokemon={ pokemon } />,
  );
  const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
  userEvent.click(linkMoreDetails);
  expect(history.location.pathname).toBe(pokemon25);
});

test('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do pokémon cujos detalhes se deseja ver', () => {
  const { history } = renderWithRouter(
    <Pokemon pokemons={ pokemons } pokemon={ pokemon } />,
  );
  const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
  userEvent.click(linkMoreDetails);
  act(() => history.push(pokemon25));
  // expect(history.location.pathname).toBe(pokemon25);

  // const imgagemPokemon = screen.getByAltText('Pikachu sprite');
  expect(history.location.pathname).toBe(pokemon25);
});

test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
  const { history } = renderWithRouter(
    <Pokemon
      pokemons={ pokemons }
      pokemon={ pokemon }
      isFavorite
    />,
  );
  const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
  userEvent.click(linkMoreDetails);
  act(() => history.push(pokemon25));
  expect(history.location.pathname).toBe(pokemon25);

  const iconeStar = screen.getByAltText('Pikachu is marked as favorite');
  expect(iconeStar).toHaveAttribute('src', '/star-icon.svg');
});
