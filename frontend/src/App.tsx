import React, { Suspense } from 'react'
import { Loading } from '@components/common';
import { Fallback, Layout } from '@components/layout';
import { Route, Routes } from 'react-router-dom';
import { Paths } from '@models';
import { Home } from '@pages';
import { useAppSelector } from '@redux/hooks';
import { useGetUserQuery } from '@redux/services';

const App = () => {
  const {isLoading: isUserLoading } = useGetUserQuery();

  if(isUserLoading){
    return (
      <Loading fullScreen={true} backgroundColor="#111815"/>
    )
  }

  return (
    <Suspense fallback={<Fallback />}>
      <Layout>
        <Routes>
          <Route path={Paths.HOME} element={<Home />} />
        </Routes>
      </Layout>
    </Suspense>
  )
}

{/* <Route path={Paths.LOGIN} element={<Login />} />
<Route path={Paths.REGISTER} element={<Register />} />
<Route path={Paths.SETTINGS} element={<UserSettings />} />
<Route path={Paths.TEST} element={<Test />} /> */}
export default App;