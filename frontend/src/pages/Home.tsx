import React from 'react'
import { NavLink } from 'react-router-dom';
import { Paths } from '@models';
import { Button } from '@components/ui';
import { ButtonShine } from '@components/ui/ButtonShine';

const Home = () => {
  return (
    <div>
      <NavLink to={Paths.SETTINGS}>
        <Button color="minor" variant='link' className='px-0'>
          User Settings
        </Button>
      </NavLink>

      <div>


<ButtonShine variant='filled' color="info">
 test
</ButtonShine>
      </div>


      {/* <div className="bg-[url('shine.png')] bg-no-repeat bg-[center_left_-256px] bg-green-500 flex cursor-pointer hover:bg-[center_left_256px] hover:transition-[background] hover:ease-out hover:duration-1000 p-4 rounded-md">
        test
      </div> */}

    </div>
  )
}

export default Home;

// a.logo .shine {
//   width: 256px;
// 	height: 256px;
// 	display: block;
// 	background: url("https://i.imgur.com/n1CetrS.png") -256px 0 no-repeat;	
//   -webkit-transition: background 0s linear;
//   -moz-transition: background 0s linear;
//   -ms-transition: background 0s linear;
//   -o-transition: background 0s linear;
// }

// a.logo:hover .shine {
// 	background-position: 256px 0px;
//   -webkit-transition: background 1s ease-out;
//   -moz-transition: background 1s ease-out;
//   -ms-transition: background 1s ease-out;
//   -o-transition: background 1s ease-out;
// }