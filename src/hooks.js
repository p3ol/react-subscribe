import { useContext } from 'react';

import { SubscribeContext } from './contexts';

export const useSubscribe = () => {
  return useContext(SubscribeContext);
};
