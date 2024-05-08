import React from 'react';
import { DBlock } from './DashboardWrapper.styled';

const DashboardWrapper = ({ children }) => {
  return <DBlock>{children}</DBlock>;
};

export default DashboardWrapper;
