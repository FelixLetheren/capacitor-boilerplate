import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Shell } from './components/_layout/shell';
import { HomeView } from './views/home/home';

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Shell />}>
        <Route index element={<HomeView />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  );
};
