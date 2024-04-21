import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

import { 
  Label,
  InputText,
  Button,
  ErrorMessage
} from "@components/ui";
import { ArrowLeftIcon, EyeClosedIcon, EyeOpenIcon, InfoIcon } from "@components/icons";
import { useForm, createValidationSchema, resolver, v } from "@util/formValidation";

import { useAppSelector } from "@redux/hooks";
import { useLoginMutation, useTokenMutation } from "@redux/services/authApi";

import { Paths, ILoginDeatils } from "@models";
import { Loading } from "@components/common";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@constant";

function Login() {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  // TODO const [token] = useTokenMutation();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const [showPassword, setShowPassword] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if user already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(Paths.SETTINGS)
    }
  }, [isAuthenticated, navigate]);

  const validationSchema = createValidationSchema({
    email: v.required().email().minLength(3),
    password: v.required().string(),
  })

  const initialState = {
    email: "",
    password: ""
  }

  const { 
    formData,
    formErrors,
    handleChange,
    setFieldValue,
    handleSubmit
  } = useForm<ILoginDeatils>({
    initialState: initialState, 
    validationSchema: validationSchema,
    validatorFn: resolver,
    onSubmit: handleLogin
  });

  async function handleLogin() {
    setIsLoading(true);
    
    try {
      // TODO const res = await token(formData).unwrap();
      const res = await login(formData).unwrap();
      localStorage.setItem(ACCESS_TOKEN, res.data.accessToken)
      localStorage.setItem(REFRESH_TOKEN, res.data.refreshToken)
      navigate(Paths.SETTINGS);
      console.log('Login successful. Redirecting...');
    } catch (error: any) {
      if(error.status === 401){
        setInvalidCredentials(true)
      }
      console.error('Error during login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO remove this!
  function autoFillDetails(){
    setFieldValue("email", "jamesprenticez@gmail.com");
    setFieldValue("password", "password123");
  }

  return (
    <div className="text-muted p-12">
      <div className="w-full max-w-[460px] bg-shadow rounded mx-auto overflow-hidden">

        <div className="h-[180px]  relative bg-[url('/bg.jpeg')] bg-cover">
          <div className="absolute bg-gradient-to-r from-fern to-moss opacity-80 inset-0"/> 

          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-white">Welcome Back!</h1>
            <p className="">Sign in to continue your journey!</p>
            <div className="flex items-center justify-center w-[80px] h-[80px] rounded-full bg-shadow absolute bottom-[-40px]">
              <NavLink to={Paths.HOME} className="w-[60%] h-[60%]">
                <div className="rounded-full">
                  <img src="/logo.svg" className="rounded-full" alt="" />
                </div>
              </NavLink>
            </div>
          </div>
        </div> 

        <form className="p-6">
          <div className="flex items-center">
            <span className="ml-auto cursor-pointer hover:text-sage">
              <InfoIcon width={24} onClick={() => autoFillDetails()}/>
            </span>
          </div> 

          <Label value="Email:" htmlFor="email">
            <InputText
              id="email"
              type="email"
              placeholder="email"
              value={formData.email}
              onChange={(e) => {
                handleChange(e);
                if(invalidCredentials) setInvalidCredentials(false);
              }}
            />
            <ErrorMessage message={formErrors.email.errorMessage}/>
            <ErrorMessage message={invalidCredentials ? "Invalid email or password" : ""}/>
          </Label>

          <Label value="Password:" htmlFor="password">
            <NavLink to={Paths.PASSWORD_RESET} tabIndex={-1}>
              <p className="absolute top-[2px] right-0 text-[11px] text-mist hover:text-sage">
                Forgot password?
              </p>
            </NavLink>
            <InputText 
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={formData.password}
              onChange={(e) => {
                handleChange(e);
                if(invalidCredentials) setInvalidCredentials(false);
              }}
            />
            <div 
              className="absolute cursor-pointer right-[10px] bottom-[24px] text-disabled hover:text-mist"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)} 
            >
              {showPassword ? (
                <EyeClosedIcon height={24} width={24}/>
                ) : (
                <EyeOpenIcon height={24} width={24}/>
              )}
            </div>
            <ErrorMessage message={formErrors.password.errorMessage }/>
            <ErrorMessage message={invalidCredentials ? "Invalid email or password" : ""}/>
          </Label>

          <Button 
            color="success"
            className="w-full mt-2 bg-green-600 relative"
            onClick={handleSubmit}
          >
            Sign In
            <span className="absolute top-[calc(50%-8px)] ml-2">
              <Loading isLoading={isLoading} height={16} width={16}/>
            </span>
          </Button>

          <div className="text-center mt-4 flex items-center justify-center flex-col">
            <p>Dont have an account?</p>
            <NavLink to={Paths.REGISTER}>
              <Button 
                variant="link"
                className="flex items-center text-sage font-bold"
              >
                Register now
                <ArrowLeftIcon width={18} strokeWidth={2} className="ml-2 rotate-[120deg]"/>
              </Button>
            </NavLink>


          </div>
        </form> 

      </div>
    </div>
  );
}

export default Login;
