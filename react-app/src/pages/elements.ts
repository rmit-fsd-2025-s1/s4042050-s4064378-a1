import styled from "styled-components";

export const AuthWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
`;

export const AuthContainer = styled.div`
  width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  & h1 {
    text-align: center;
    margin-bottom: 10px;
  }

  & h2 {
    text-align: center;
    margin-bottom: 20px;
  }
`;

export const SuccessMessage = styled.div`
  background-color: #ddffdd;
  color: #28a745;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
`;

export const ErrorMessage = styled.div`
  background-color: #ffdddd;
  color: #ff0000;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
`;

export const AuthFooter = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  margin-right: 20px;

  & input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  & label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }
`;

export const Link = styled.span`
  color: rgb(0, 94, 255);
  text-decoration: none;
  cursor: pointer;
`;
