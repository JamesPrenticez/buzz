import React from 'react'
import { useAppSelector } from '@redux/hooks';

function UserSettings() {
  const {data: user, isAuthenticated} = useAppSelector((state) => state.user);

  return (
    <div>Welcome {user.firstName} you are {isAuthenticated ? "authenticated" : "not authenticated"}!</div>
  )
}

export default UserSettings;