import React, { type ReactElement, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "@constant";
import { Loading } from "@components/common";
import { useRefreshAccessTokenMutation } from "@redux/services/authApi";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { loginUser, logoutUser } from "@redux/slices";
import { Paths } from "@models";

interface Props {
  children: ReactElement;
}

function ProtectedRoute({children}: Props): ReactElement{
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const [refreshAccessToken] = useRefreshAccessTokenMutation();
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  // console.log("access_token", accessToken)

  useEffect(() => {
    authorise().catch(() => dispatch(logoutUser()));
  }, [])

  const authorise = async () => {
    if(!accessToken){
      dispatch(logoutUser());
      return;
    }
    const decoded = jwtDecode(accessToken);
    const tokenExpiration = decoded.exp ?? 0;
    const now = Date.now() / 1000 

    // console.log("expiry_time", tokenExpiration)
    // console.log("now", now)
    // console.log("expiary < now", tokenExpiration < now, "should be false for a valid access token")

    if(tokenExpiration < now){
      await handleRefreshAccessToken();
      return;
    } 
    
    dispatch(loginUser())
  }

  const handleRefreshAccessToken = async () => {
    const refreshToken: string = localStorage.getItem(REFRESH_TOKEN) ?? ""
    try {
      const res = await refreshAccessToken(refreshToken).unwrap();
      localStorage.setItem(ACCESS_TOKEN, res.data.access)
      dispatch(loginUser());
    } catch (error: unknown) {
      console.log(error);
      dispatch(logoutUser());
    }
  }

  if(isAuthenticated === false && accessToken){
    return <Loading fullScreen={true} backgroundColor="#111815" />
  }

  return isAuthenticated ? (
    console.log("Accepted - access token is present"),
    children
  ) : (
    console.log("Rejected - access token not present"),
    <Navigate to={Paths.LOGIN} />
  )

}

export default ProtectedRoute;