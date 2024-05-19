
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Paths } from '@models';

import { ProtectedRoute } from '@components/auth';
import { Fallback, Layout } from '@components/layout';

import { 
  Home,
  Login,
  Logout,
  Register,
  UserSettings,
  TimerPage,
  TasksPage,
  NotFound,
} from '@pages';

// We are using this as testing ground
import { 
  DatesPage,
  FetchPage
} from '@pages/Admin';

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
          <Route path={Paths.TASKS} element={<TasksPage />}></Route>
          <Route path={Paths.TIMER} element={<TimerPage />}></Route>
          <Route path="testing" element={
            <>
              <FetchPage />
              <DatesPage />
            </>
            }>
            </Route>
          <Route path={Paths.NOT_FOUND} element={<NotFound />}></Route>
        </Routes>
      </Layout>
    </Suspense>
  );
}

export default App;

{/*
<Route path={Paths.TEST} element={<Test />} /> 
*/}