import React from 'react';

export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
  return <>{children}</>;
};

export default PrimaryLayout;
