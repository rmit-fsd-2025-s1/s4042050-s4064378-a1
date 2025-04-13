import { Page } from "../App";
import { setCurrentUserToLocalStorage } from "../util/localStorage";
import { LogoutButton } from "./Buttons/LogoutButton";
import { DashboardWrapper } from "./element";

export const Dashboard = ({
  header,
  navigateTo,
}: {
  header: string;
  navigateTo: (page: Page) => void;
}) => {
  const onLogout = () => {
    setCurrentUserToLocalStorage(null);
    navigateTo("login");
  };

  return (
    <DashboardWrapper>
      <div>
        <h1>{header}</h1>
      </div>
      <div>
        <LogoutButton
          onClick={() => {
            onLogout();
          }}
        />
      </div>
    </DashboardWrapper>
  );
};
