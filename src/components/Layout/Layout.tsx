import * as React from 'react';
import ToolBar from '../ToolBar/ToolBar.tsx';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <ToolBar/>
      </header>
      <main className="container">
        {children}
      </main>
    </>
  );
};

export default Layout;