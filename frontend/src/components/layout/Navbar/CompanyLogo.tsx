import React, { type ReactElement }  from 'react'
import { NavLink } from "react-router-dom";
import Logo from '@components/common/Logo';
import LogoReverse from '@components/common/LogoReverse';

function CompanyLogo({onClick}: {onClick: () => void}): ReactElement {
  return (
    <NavLink to="/">
      <div className="flex items-center cursor-pointer">
        <Logo className="w-[33px]" {...{onClick}}/>
        {/* <LogoReverse className="w-[33px]" {...{onClick}}/> */}
      </div>
    </NavLink>
  )
}

export default CompanyLogo;