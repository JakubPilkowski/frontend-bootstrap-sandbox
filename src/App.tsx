import React from 'react';
import { Outlet } from 'react-router-dom';
import AppVersion from './components/AppVersion';
import { useStatus } from '@featurevisor/react';

const App = () => {
  const { isReady } = useStatus();

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <h1 className="text-xl font-bold text-center">
          🚀 Rick and Morty - Hello from aws
          {/* {import.meta.env.VITE_TEST} {__TEAM__}{' '}
          {import.meta.env.VITE_XYZ_TEST_ENV}
          {import.meta.env.VITE_XYZ_INLINE} */}
        </h1>
      </div>
      <AppVersion />
      {isReady && <Outlet />}
    </div>
  );
};

export default App;
