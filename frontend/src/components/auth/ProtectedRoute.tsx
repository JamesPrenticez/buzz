import React, { useState, type ReactNode, type ReactElement, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "@constant";
import { Loading } from "@components/common";
import { useRefreshAccessTokenMutation } from "@redux/services/authApi";

interface Props {
  children: ReactElement;
}

function ProtectedRoute({children}: Props): ReactElement{
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [refreshAccessToken] = useRefreshAccessTokenMutation();

  useEffect(() => {
    auth().catch(() => setIsAuth(false))
  }, [])

  const handleRefreshAccessToken = async () => {
    const refreshToken: string = localStorage.getItem(REFRESH_TOKEN) ?? ""
    try {
      const res = await refreshAccessToken({refreshToken: refreshToken}).unwrap();
      localStorage.setItem(ACCESS_TOKEN, res.data.accessToken)
      setIsAuth(true)
    } catch (error: unknown) {
      console.log(error);
      setIsAuth(false);
    }
  }

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if(!token){
      setIsAuth(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp ?? 0;
    const now = Date.now() / 1000 

    if(tokenExpiration < now){
      await handleRefreshAccessToken();
    }
  }

  if(isAuth === null){
    return <Loading fullScreen={true} backgroundColor="#111815" />
  }

  return isAuth ? children : <Navigate to="/login" />

}

export default ProtectedRoute;