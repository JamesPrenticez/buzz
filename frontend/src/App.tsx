import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import { useGetUserQuery } from '@redux/services';

import { Paths } from '@models';

import { Loading } from '@components/common';
import { ProtectedRoute } from '@components/auth';
import { Fallback, Layout } from '@components/layout';

import { 
  Home,
  Login,
  Logout,
  Register,
  UserSettings,
  NotFound,
} from '@pages';

const App = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Layout>
        <Routes>
          <Route path={Paths.HOME} element={<Home />} />
          <Route path={Paths.LOGIN} element={<Login />} />
          <Route path={Paths.LOGOUT} element={<Logout />} />
          <Route path={Paths.REGISTER} element={<Register />} />
          <Route path={Paths.SETTINGS} element={
            <ProtectedRoute>
              <UserSettings />
            </ProtectedRoute>
          }/>
          <Route path={Paths.NOT_FOUND} element={<NotFound />}></Route>
        </Routes>
      </Layout>
    </Suspense>
  );
}

{/*
<Route path={Paths.REGISTER} element={<Register />} />
<Route path={Paths.TEST} element={<Test />} /> */}
export default App;