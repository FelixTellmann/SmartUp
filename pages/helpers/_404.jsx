import Error from 'next/error';
import React from 'react';

export function Error404() {
  return <Error statusCode={404} />;
};
