import styled from "styled-components";
import { BaseButton } from "./BaseButton";

export const SubmitButtonWrapper = styled(BaseButton)`
  width: 100%;
  padding: 10px;
  background-color: rgb(0, 94, 255);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: rgb(38, 3, 118);
  }
`;
