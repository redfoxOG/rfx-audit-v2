import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/Landing.jsx';

test('renders Start Scan link', () => {
  render(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  );

  expect(screen.getByText(/Start Scan/i)).toBeInTheDocument();
});
