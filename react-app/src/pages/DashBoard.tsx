import { DashboardWrapper } from "./element";

export const Dashboard = ({ header }: { header: string }) => {
  return (
    <DashboardWrapper>
      <h1>{header}</h1>
    </DashboardWrapper>
  );
};
