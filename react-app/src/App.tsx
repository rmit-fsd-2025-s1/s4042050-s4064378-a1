import React, { useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { User } from "./types/User";
import { App } from "./elements";

const TechTeam = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<String>("login");
  const [registrationSuccess, setRegistrationSuccess] = useState<
    boolean | undefined
  >(false);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return (
          <LoginPage
            setCurrentUser={setCurrentUser}
            navigateTo={navigateTo}
            registrationSuccess={registrationSuccess}
            setRegistrationSuccess={setRegistrationSuccess}
          />
        );
      case "register":
        return <div>register page</div>;
      case "main":
        return <div>mainpage</div>;
      default:
        return <div>default page</div>;
    }
  };

  return <App>{renderPage()}</App>;
};

export default TechTeam;
