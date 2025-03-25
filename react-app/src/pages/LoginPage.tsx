import React, { useState } from "react";
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
          {error && <ErrorMessage>{error}</ErrorMessage>}

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

          <SubmitButton>Login</SubmitButton>

          <AuthFooter>
            Don't have an account?{" "}
            <Link onClick={() => navigateTo("register")}>Register</Link>
          </AuthFooter>
        </form>
      </AuthContainer>
    </AuthWrapper>
  );
};
