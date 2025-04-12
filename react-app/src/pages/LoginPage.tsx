import React, { useRef, useState } from "react";
import { User } from "../types/User";
import {
  AuthContainer,
  AuthFooter,
  AuthWrapper,
  FormGroup,
  Link,
  SuccessMessage,
} from "./element";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";
import ReCAPTCHA from "react-google-recaptcha";
import { validateRegex } from "../util/validateRegex";
import {
  CHECK_EMAIL_REGEX,
  DONT_HAVE_ACCOUNT,
  LOGIN,
  REGISTER_SUCCESS,
  TECH_TEAM,
} from "./constant";
import { userValidation } from "../util/userValidation";
import { ErrorMessage } from "../components/ActivityStatus/ErrorMessage";

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

    if (!validateRegex(email, CHECK_EMAIL_REGEX)) {
      setError("Enter a valid email address");
      return;
    }

    if (password === "") {
      setError("Enter the password");
      return;
    }

    // Check if recaptcha ref exists and get the value
    if (!recaptcha.current) {
      setError("CAPTCHA not loaded");
      return;
    }
    const captchaValue = recaptcha.current.getValue();

    if (!captchaValue) {
      setError("Please verify the reCAPTCHA!");
      return;
    }

    setError("");

    const user = userValidation({ email, password });
    if (user) {
      setCurrentUser(user);
      if (user.role === "lecturer") {
        navigateTo("lecturer");
      } else {
        navigateTo("tutor");
      }
      return;
    }

    setError("User Not Found");
  };

  return (
    <AuthWrapper>
      <AuthContainer>
        <h1>{TECH_TEAM}</h1>
        <h2>{LOGIN}</h2>

        {registrationSuccess && (
          <SuccessMessage>{REGISTER_SUCCESS}</SuccessMessage>
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
          <PrimaryButton>Login</PrimaryButton>
          {error && <ErrorMessage message={error} />}

          <AuthFooter>
            {DONT_HAVE_ACCOUNT}{" "}
            <Link onClick={() => navigateTo("register")}>Register</Link>
          </AuthFooter>
        </form>
      </AuthContainer>
    </AuthWrapper>
  );
};
