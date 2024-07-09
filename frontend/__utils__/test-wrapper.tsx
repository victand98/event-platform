import React from 'react';

export const TestWrapper: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;

  return <React.Fragment>{children}</React.Fragment>;
};
