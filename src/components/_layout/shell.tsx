import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { AppContextProvider } from '../../contexts/appContext';
import { Header } from './header';

import styles from './shell.module.scss';

export const Shell: React.FunctionComponent<{}> = () => {
  return (
    <AppContextProvider>
      <div className={styles.shell}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </AppContextProvider>
  );
};
