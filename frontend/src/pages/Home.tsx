import React from 'react'
import { NavLink } from 'react-router-dom';
import { Paths } from '@models';
import { Button } from '@components/ui';

const Home = () => {
  return (
    <div>
      <NavLink to={Paths.SETTINGS}>
        <Button color="minor" variant='link' className='px-0'>
          User Settings
        </Button>
      </NavLink>
    </div>
  )
}

export default Home;