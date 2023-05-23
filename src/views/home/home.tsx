import * as React from 'react';

import { AppContext } from '../../contexts/appContext';

import styles from './home.module.scss';

export const HomeView: React.FC = () => {
  const { data } = React.useContext(AppContext);

  return (
    <div className={styles.homeMessage}>
      Hello. It is me, the homepage. Here is some data from context: <span data-testid="context-value">{data}</span>
      <div data-testid="test-hook-value">{}</div>
    </div>
  );
};
