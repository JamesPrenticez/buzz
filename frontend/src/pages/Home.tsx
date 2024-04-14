import React from 'react'
import { useAppSelector } from '@redux/hooks';

const Home = () => {
  const user = useAppSelector((state) => state.user.data);
  console.log(user)

  return (
    <div>Welcome {user.firstName}!</div>
  )
}

export default Home;