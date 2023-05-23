import React from 'react';

interface IAppContext {
  data?: string;
  setData?: (value: string) => void;
}

export const AppContext = React.createContext<IAppContext>({});

export const AppContextProvider = ({ children }: React.PropsWithChildren) => {
  const [data, setData] = React.useState('hello world');

  return <AppContext.Provider value={{ data, setData }}>{children}</AppContext.Provider>;
};
