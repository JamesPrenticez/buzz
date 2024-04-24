import React, { ReactNode, useState, type ReactElement } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Paths } from "@models";
import { Button } from "@components/ui";
import { capitalizeFirstLetter } from "@util";

import RightNav from "./RightNav";
import Hamburger from "./Hamburger";
import CompanyLogo from "./CompanyLogo";
import CompanyName from "./CompanyName";
import { navigationItemsForAuthenticedUsers, navigationItemsForHomepage } from "@constant";
import { useAppSelector } from "@redux/hooks";

function Navbar(): ReactElement {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const { data: user, isAuthenticated } = useAppSelector((state) => state.user);

  if(location.pathname === "/"){
    return (
      <NavbarWrapper>
        <div className="flex items-center">
          <CompanyLogo onClick={() => setIsMenuOpen(false)}/>
          <CompanyName className="ml-4"/>
        </div>

        <ul className="flex space-x-4">
          {navigationItemsForHomepage.map((page, _) => (
            <li key={page.name}>
              <NavLink to={page.path} tabIndex={-1}>
                <Button variant="link" color="muted" className="p-0">
                  {capitalizeFirstLetter(page.name)}
                </Button>
              </NavLink>
            </li>
          ))}
        </ul>

        <div>
          {!isAuthenticated && user.email !== "" ? (
            <>
              <NavLink to={Paths.LOGIN}>
                <Button variant="link" color="muted" className="ml-auto px-4">
                  Login
                </Button>
              </NavLink>
              <NavLink to={Paths.REGISTER}>
                <Button color="cta" className="px-4 font-[500]">
                  Get Started
                </Button>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={Paths.SETTINGS}>
                <Button variant="link" color="muted" className="ml-auto px-4">
                  {user.email}
                </Button>
              </NavLink>
            </>
          )}
        </div>
      </NavbarWrapper>
    )
  }

  return (
    <>
      <div className="bg-tarantula text-muted h-[4rem] md:h-[5rem] flex font-semibold px-4">
        <div className="flex items-center max-w-7xl w-full mx-auto">
          <CompanyLogo onClick={() => setIsMenuOpen(false)}/>

          <div className="flex space-x-4 ml-auto">
            <Hamburger 
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={() => { setIsMenuOpen((prevState) => !prevState) }}
            /> 
          </div>
        </div>
      </div>
      <RightNav
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={() => { setIsMenuOpen((prevState) => !prevState) }}
        menuItems={navigationItemsForAuthenticedUsers}
      />
    </>
  );
};

interface NavbarWrapperProps {
  children: ReactNode;
}

const NavbarWrapper = ({children}: NavbarWrapperProps) => {
  return (
    <div className="bg-tarantula h-[4rem] md:h-[5rem] flex font-[inter] font-[400] text-[16px] px-4">
      <div className="flex items-center justify-between max-w-7xl w-full mx-auto">
        {children}
      </div>
  </div>
  )
}

export default Navbar;