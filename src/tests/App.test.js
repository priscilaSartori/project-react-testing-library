import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente < App.js />', () => {
  test('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkHome = screen.getByRole('link', { name: /Home/i });
    expect(linkHome).toBeInTheDocument();
    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavorite).toBeInTheDocument();
  });

  test('Se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test('Se a aplicação é redirecionada para a página de About, na URL / about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('Se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL / favorites, ao clicar no link Favorite Pokémons da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/xablau'));
    const notFoundText = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(notFoundText).toBeInTheDocument();
  });
});
