import React, { useEffect, useState } from "react";
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
import { useRegisterMutation } from "@redux/services/authApi";

import { Paths, IRegisterDeatils } from "@models";
import AuthFormWrapper from "./AuthFormWrapper";
import { Loading } from "@components/common";

function Register() {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const [showPassword, setShowPassword] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false)
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
  } = useForm<IRegisterDeatils>({
    initialState: initialState, 
    validationSchema: validationSchema,
    validatorFn: resolver,
    onSubmit: handleRegister
  });

  async function handleRegister() {
    setIsLoading(true);
    
    try {
      const res = await register(formData).unwrap();
      console.log(res)
      navigate(Paths.SETTINGS);
      console.log('Login successful. Redirecting...');
    } catch (error: any) {
      if(error.status === 401){
        setEmailAlreadyExists(true)
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
    <AuthFormWrapper title="Register" subTitle="Start your self improvement journey today!">
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
                if(emailAlreadyExists) setEmailAlreadyExists(false);
              }}
            />
            <ErrorMessage message={formErrors.email.errorMessage}/>
            <ErrorMessage message={emailAlreadyExists ? "Email address already in use." : ""}/>
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
              onChange={handleChange}
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
            <ErrorMessage message={formErrors.password.errorMessage}/>
          </Label>

          <Button 
            color="minor"
            className="w-full mt-2 relative"
            onClick={handleSubmit}
          >
            Sign Up
            <span className="absolute top-[calc(50%-8px)] ml-2">
              <Loading isLoading={isLoading} height={16} width={16}/>
            </span>
          </Button>

          <div className="mt-4 text-[12px] text-center">
            <p>By registering you agree to our&nbsp;
              <NavLink to={Paths.TERMS_OF_SERVICE}>
                <Button 
                  variant="link"
                  color="cta"
                  className="inline-flex p-0 items-center"
                >
                  Terms of Service
                </Button>
              </NavLink>
              &nbsp;and our&nbsp;
              <NavLink to={Paths.PRIVACY_POLICY}>
                <Button 
                  variant="link"
                  color="cta"
                  className="inline-flex p-0 items-center"
                >
                  Privacy Policy
                </Button>
              </NavLink>
            </p>
          </div>

          <div className="text-center mt-4 flex items-center justify-center flex-col">
            <p>Already have an account?</p>
            <NavLink to={Paths.LOGIN}>
              <Button 
                variant="link"
                color="cta"
                className="flex items-center"
              >
                Login
                <ArrowLeftIcon width={18} strokeWidth={2} className="ml-2 rotate-[120deg]"/>
              </Button>
            </NavLink>
          </div>

      </form> 
    </AuthFormWrapper>
  );
}

export default Register;
