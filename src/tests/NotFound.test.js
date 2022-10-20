import NotFound from '../pages/NotFound';

const { screen, render } = require('@testing-library/react');

test('se a página contém um heading h2 com o texto Page requested not found', () => {
  render(<NotFound />);
  const heading2 = screen.getByRole('heading', { level: 2, name: /Page requested not found/i });
  expect(heading2).toBeInTheDocument();
});

test('se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  render(<NotFound />);
  const imagem = screen.getAllByRole('img');
  expect(imagem[0]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
