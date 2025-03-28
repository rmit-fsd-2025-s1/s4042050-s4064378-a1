import React, { useState } from "react";
import { Role } from "../types/User";
import {
  AuthContainer,
  AuthFooter,
  AuthWrapper,
  ErrorMessage,
  FormGroup,
  Link,
  StyledLabel,
  StyledSelect,
} from "./elements";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";
import { HAVE_ACCOUNT, LOGIN, REGISTER, TECH_TEAM } from "./constants";
import { addUser, isEmailExist } from "../util";

// Register Page Component
export const RegisterPage = ({
  navigateTo,
  setRegistrationSuccess,
}: {
  navigateTo: (page: string) => void;
  setRegistrationSuccess: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
}) => {
  const [role, setRole] = useState<Role>("tutor" as unknown as Role);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: any) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Check if email already exists
    const emailExists = isEmailExist(email);

    if (emailExists) {
      setError("The email already exists");
    } else {
      // In a real app, you would call an API to register the user
      addUser({ email, role, password });
      setRegistrationSuccess(true);
      navigateTo("login");
    }
  };

  return (
    <AuthWrapper>
      <AuthContainer>
        <h1>{TECH_TEAM}</h1>
        <h2>{REGISTER}</h2>

        <form onSubmit={handleRegister}>
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
            <StyledLabel htmlFor="role">Role</StyledLabel>
            <StyledSelect
              id="role"
              value={String(role)}
              onChange={(e) => setRole(e.target.value as unknown as Role)}
              required
            >
              <option value="tutor">Tutor</option>
              <option value="lecturer">Lecturer</option>
            </StyledSelect>
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
            />
          </FormGroup>

          <PrimaryButton type="submit">Register</PrimaryButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <AuthFooter>
            {HAVE_ACCOUNT}{" "}
            <Link className="link" onClick={() => navigateTo("login")}>
              {LOGIN}
            </Link>
          </AuthFooter>
        </form>
      </AuthContainer>
    </AuthWrapper>
  );
};
