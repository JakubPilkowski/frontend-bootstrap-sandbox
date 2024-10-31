import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import App from './App';
import { fetchCharacter, fetchCharacters } from './loaders/CharacterLoader';
import { CharacterRouteParams } from './types/types';
import { ConfigProvider } from './context/ConfigContext';
import { createInstance } from '@featurevisor/sdk';
import { FeaturevisorProvider } from '@featurevisor/react';

import { initSentry } from './sentry';

const Characters = lazy(() => import('./pages/Characters'));
const CharacterDetails = lazy(() => import('./pages/CharacterDetails'));

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        loader: fetchCharacters,
        element: <Characters />,
      },
      {
        path: 'character/:id',
        loader: async ({ params }) => {
          return fetchCharacter({ params } as CharacterRouteParams);
        },
        element: <CharacterDetails />,
      },
    ],
  },
]);

initSentry();

const environmentName =
  import.meta.env.VITE_ENVIRONMENT === 'local' ? 'preview' : import.meta.env.VITE_ENVIRONMENT;

const f = createInstance({
  datafileUrl: `https://d297osy1tbw6rg.cloudfront.net/datafiles/${environmentName.toLowerCase()}/datafile-tag-all.json`,
});

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <FeaturevisorProvider instance={f}>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </FeaturevisorProvider>
  </React.StrictMode>,
);
