import React, { type ReactElement } from 'react'
import { useAppSelector } from "@redux/hooks";
// import { getInitials } from "@utils";

interface Props {
  width?: number,
  height?: number
}

function Avatar ({
  width = 50,
  height = 50
}: Props): ReactElement {
  const user = useAppSelector((state) => state.user);

  return (
    <div className="flex space-x-4 items-center relative text-muted">

      {user.data?.profilePicture ? (
        <div 
          className="block rounded-full bg-cover bg-center border-2 overflow-hidden"
          style={{ 
            width: width,
            height: height,
            backgroundImage: `url("${user.data.profilePicture}")`
          }}
        />
      ) : (user.data?.firstName && user.data?.lastName) ? (
        <div className="flex justify-center items-center rounded-full border-2 overflow-hidden bg-primary font-bold text-[18px]"
          style={{ 
            width: width,
            height: height,
          }}
        >
          {/* {getInitials(user.data.firstName, user.data.lastName)} */}
        </div>
      ) : (
        <div className="flex justify-center items-center rounded-full border-2 overflow-hidden bg-red-500 font-bold text-[18px]"
          style={{ 
            width: width,
            height: height,
          }}
        >
          N/A
        </div>
        // <div 
        //   className="block rounded-full bg-cover bg-center border-2 overflow-hidden"
        //   style={{ 
        //     width: width,
        //     height: height,
        //     backgroundImage: `url("avatar.png")`
        //   }}
        // />
      )}

      <AvatarBadge />

    </div>
   );
};

function AvatarBadge(){
  return (
    <div className="absolute -right-[15px] -bottom-[10px] w-8 h-8">
      <img src="./badges/30day.svg" width="100%" height="100%" alt="" />
    </div>
  )

}

export default Avatar;