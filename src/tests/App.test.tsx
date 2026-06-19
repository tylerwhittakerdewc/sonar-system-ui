import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders the main application layout', () => {
    render(<App />);
    const navbarElement = screen.getByRole('navigation');
    const controlsElement = screen.getByTestId('controls');
    const hudElement = screen.getByTestId('hud');

    expect(navbarElement).toBeInTheDocument();
    expect(controlsElement).toBeInTheDocument();
    expect(hudElement).toBeInTheDocument();
  });

  test('renders sonar display', () => {
    render(<App />);
    const sonarCanvasElement = screen.getByTestId('sonar-canvas');
    expect(sonarCanvasElement).toBeInTheDocument();
  });
});