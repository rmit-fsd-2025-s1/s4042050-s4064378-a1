import styled from "styled-components";

export const DashboardWrapper = styled.div`
  background-color: var(--secondary-color);
  color: white;
  padding: 20px;
  border-radius: var(--border-radius);
  margin-bottom: 20px;
  box-shadow: var(--box-shadow);

  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 24px;
  }
`;
