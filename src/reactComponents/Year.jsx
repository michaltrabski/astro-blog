import React from 'react';
import { useStore } from '@nanostores/react';
import { isCartOpen } from '../cartStore';

export const Year = () => {
  const $isCartOpen = useStore(isCartOpen);

  return (
    <span>
      {new Date().getFullYear()} / {JSON.stringify($isCartOpen)}
    </span>
  );
};
