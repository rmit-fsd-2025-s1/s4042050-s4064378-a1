import React, { useRef, useState } from "react";
import { User } from "../types/User";
import {
  AuthContainer,
  AuthFooter,
  AuthWrapper,
  ErrorMessage,
  FormGroup,
  Link,
  SuccessMessage,
} from "./elements";
import { SubmitButton } from "../components/Buttons/SubmitButton";
import ReCAPTCHA from "react-google-recaptcha";

const REACT_APP_SITE_KEY = "6LfaTQErAAAAAM4oamNji2SSm2uVi3-gUk1ul29S";
const SITE_SECRET = "6LfaTQErAAAAACODMgjJzjm-jubUGIz8S13k9m2H";

export const LoginPage = ({
  setCurrentUser,
  navigateTo,
  registrationSuccess,
  setRegistrationSuccess,
}: {
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  navigateTo: (page: any) => void;
  registrationSuccess?: boolean;
  setRegistrationSuccess?: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const recaptcha = useRef<ReCAPTCHA>(null);

  React.useEffect(() => {
    if (registrationSuccess && setRegistrationSuccess) {
      const timer = setTimeout(() => {
        setRegistrationSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, setRegistrationSuccess]);

  const handleLogin = (e: any) => {
    e.preventDefault();

    // Check if recaptcha ref exists and get the value
    if (!recaptcha.current) {
      alert("CAPTCHA not loaded");
      return;
    }
    const captchaValue = recaptcha.current.getValue();

    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
      return;
    }
  };

  return (
    <AuthWrapper>
      <AuthContainer>
        <h1>Tech Team</h1>
        <h2>Login</h2>

        {registrationSuccess && (
          <SuccessMessage>
            Registration successful! You can now login.
          </SuccessMessage>
        )}

        <form onSubmit={handleLogin}>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormGroup>
          <ReCAPTCHA ref={recaptcha} sitekey={REACT_APP_SITE_KEY} />
          <SubmitButton>Login</SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <AuthFooter>
            Don't have an account?{" "}
            <Link onClick={() => navigateTo("register")}>Register</Link>
          </AuthFooter>
        </form>
      </AuthContainer>
    </AuthWrapper>
  );
};
