import { FunctionComponent } from 'react';

export const withPrivate = (component: FunctionComponent) => {
  console.log(localStorage);

  return component;
};
