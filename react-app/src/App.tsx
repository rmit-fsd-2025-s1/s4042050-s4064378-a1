import React, { useEffect, useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { User } from "./types/User";
import { App } from "./elements";
import { RegisterPage } from "./pages/RegisterPage";
import TutorDashboard from "./pages/Tutor/TutorDashboard";
import { LecturerPage } from "./components/LecturerDashboard";
import { addMockUsersToLocalStorage } from "./util/addMockUsersToLocalStorage";
import Popup from "./components/Popup/Popup";

export type Page = "login" | "register" | "tutor" | "lecturer";

const TechTeam = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [registrationSuccess, setRegistrationSuccess] = useState<
    boolean | undefined
  >(false);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    addMockUsersToLocalStorage();
    return () => localStorage.clear();
  }, []);

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
          // <LecturerPage />
          // <Popup />
        );
      case "register":
        return (
          <RegisterPage
            navigateTo={navigateTo}
            setRegistrationSuccess={setRegistrationSuccess}
          />
          // <TutorDashboard />
          // <CourseForm onSubmit={() => {}} />
        );
      case "tutor":
        return <TutorDashboard />;
      case "lecturer":
        return <LecturerPage />;
      default:
        return <div>default page</div>;
    }
  };

  return <App>{renderPage()}</App>;
};

export default TechTeam;
