import React from 'react';
import { useConfig } from '../context/ConfigContext';

export default function AppVersion() {
  const { appVersion } = useConfig();
  const env = import.meta.env.VITE_ENVIRONMENT;

  return env !== 'Production' ? (
    <div className="fixed bottom-4 right-4">
      {env} {appVersion}
    </div>
  ) : null;
}
