import React from 'react'
import { useAppSelector } from '@redux/hooks';

function UserSettings() {
  const user = useAppSelector((state) => state.user.data);

  return (
    <div>Welcome {user.firstName}!</div>
  )
}

export default UserSettings;