import React from 'react';

export default function FailToFetch(error) {
  return error && <>Error! {error.message}</>;
}
