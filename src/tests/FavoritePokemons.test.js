import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const { screen, render } = require('@testing-library/react');

test('se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha pokémons favoritos', () => {
  render(<FavoritePokemons />);
  expect(() => getByText(/More details/i)).toThrow();
  expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
});

test('se são exibidos todos os cards de pokémons favoritados', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
  userEvent.click(linkMoreDetails);

  const checkbox = screen.getByRole('checkbox');
  userEvent.click(checkbox);

  const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
  expect(linkFavorite).toBeInTheDocument();
  userEvent.click(linkFavorite);

  const { history } = renderWithRouter(<App />);
  act(() => history.push('/FavoritePokemons'));
  expect(history.location.pathname).toBe('/FavoritePokemons');

  const imagem = screen.getAllByRole('img');
  expect(imagem[1]).toHaveAttribute('src', '/star-icon.svg');
});
