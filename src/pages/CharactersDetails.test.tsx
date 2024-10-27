import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import CharacterDetails from './CharacterDetails';
import { Character } from '../../lib/rick-and-morty-api-client';

// Mock data for character
const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  image: 'https://example.com/rick.png',
  location: { name: 'Earth (C-137)' },
  // other fields can be omitted or added as necessary
};

// Mock useLoaderData from react-router-dom
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useLoaderData: () => mockCharacter,
  };
});

describe('CharacterDetails', () => {
  it('renders character details correctly', () => {
    render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>,
    );

    // Check if the image renders correctly
    const image = screen.getByAltText(`${mockCharacter.name} - Profile Image`);
    expect(image).toHaveAttribute('src', mockCharacter.image);

    // Check if character details are displayed correctly
    expect(screen.getByText(mockCharacter?.name || '')).toBeInTheDocument();
    expect(screen.getByText(`Status: ${mockCharacter.status}`)).toBeInTheDocument();
    expect(screen.getByText(`Type: ${mockCharacter.species}`)).toBeInTheDocument();
    expect(screen.getByText(`Location: ${mockCharacter?.location?.name}`)).toBeInTheDocument();

    // Check if link to the characters list is present
    const backButton = screen.getByTestId('characters-list-link');
    expect(backButton).toHaveTextContent('Back to list');
  });
});
