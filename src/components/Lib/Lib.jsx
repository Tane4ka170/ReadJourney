import Block from 'components/Block/Block';
import Books from 'components/Books/Books';
import Dashboard from 'components/Dashboard/Dashboard';
import React from 'react';

export default function Lib() {
  return (
    <Block>
      <Dashboard />
      <Books />
    </Block>
  );
}
