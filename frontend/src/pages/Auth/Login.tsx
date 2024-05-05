import React, { useEffect, useState, type ReactElement } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { 
  Label,
  InputText,
  Button,
  ErrorMessage
} from "@components/ui";
import { ArrowLeftIcon, EyeClosedIcon, EyeOpenIcon, InfoIcon } from "@components/icons";
import { useForm, createValidationSchema, resolver, v } from "@util/formValidation";

import { useAppSelector } from "@redux/hooks";
import { useLoginMutation } from "@redux/services/authApi";

import { Paths, ILoginDeatils } from "@models";
import { Loading } from "@components/common";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@constant";
import AuthFormWrapper from "./AuthFormWrapper";

function Login(): ReactElement {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
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

  const initialState: ILoginDeatils = {
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
      const res = await login(formData).unwrap();
      console.log(res)
      localStorage.setItem(ACCESS_TOKEN, res.data.access_token)
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh_token)
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
    <AuthFormWrapper title="Welcome Back!" subTitle="Sign in to continue your journey!">
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
            className="w-full mt-2 relative"
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
                color="cta"
                className="flex items-center"
              >
                Register now
                <ArrowLeftIcon width={18} strokeWidth={2} className="ml-2 rotate-[120deg]"/>
              </Button>
            </NavLink>
          </div>
          
      </form> 
    </AuthFormWrapper>
  );
}

export default Login;
