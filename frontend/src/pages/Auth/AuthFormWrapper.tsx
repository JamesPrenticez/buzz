import React, { type ReactNode, type ReactElement } from "react";
import { Paths } from "@models";
import { NavLink } from "react-router-dom";

interface Props {
  title: string;
  subTitle: string;
  children: ReactNode;
}

function AuthFormWrapper({ title, subTitle, children }: Props): ReactElement {
  return (
    <div className="text-muted p-12">
      <div className="w-full max-w-[460px] bg-shadow rounded mx-auto overflow-hidden">
        <div className="h-[180px] relative bg-[url('/bg.jpeg')] bg-cover">
          <div className="absolute bg-gradient-to-r from-fern to-moss opacity-80 inset-0" />

          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="">{subTitle}</p>
            <div className="flex items-center justify-center w-[80px] h-[80px] rounded-full bg-shadow absolute bottom-[-40px]">
              <NavLink to={Paths.HOME} className="w-[60%] h-[60%]">
                <div className="rounded-full">
                  <img src="/logo.svg" className="rounded-full" alt="" />
                </div>
              </NavLink>
            </div>
          </div>
        </div>

        {children}
        
      </div>
    </div>
  );
}

export default AuthFormWrapper;
