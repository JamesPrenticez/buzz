import React from 'react'
import { Paths } from '@models';
import { Navigate } from 'react-router-dom';

function Logout() {
  localStorage.clear();
  return <Navigate to={Paths.LOGIN} />
}

export default Logout;