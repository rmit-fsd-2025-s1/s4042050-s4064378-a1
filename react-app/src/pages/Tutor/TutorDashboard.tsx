import React, { useState, useEffect } from "react";
import { Course, Tutor, TutorRole } from "../../types/Tutor";
import TutorApplication from "./TutorApplication";
import PreviousRoles from "./TutorPreviousRoles";
import ProfileInformation from "./ProfileInformation";
import { TutorDashboardWrapper } from "./element";
import { mockCourses } from "../../mockData/mockData";
import { Dashboard } from "../../components/DashBoard";
import { User } from "../../types/User";
import { getTutorByEmail } from "../../util/getTutor";
import { addTutor } from "../../util/addTutor";
import { updateTutor } from "../../util/updateTutor";
import { Page } from "../../App";

/**
 * Dashboard view for tutors with navigation and user info.
 *
 * @param currentUser - Currently logged in user (null if not authenticated)
 * @param navigateTo - Function to navigate between dashboard pages
 */

const TutorDashboard = ({
  currentUser,
  navigateTo,
}: {
  currentUser: User | null;
  navigateTo: (page: Page) => void;
}) => {
  const [tutorProfile, setTutorProfile] = useState<Tutor | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<"apply" | "profile" | "roles">(
    "profile"
  );

  useEffect(() => {
    // Mock API call to fetch tutor profile
    const fetchTutorProfile = async () => {
      if (currentUser) {
        let tutor: Tutor | null = getTutorByEmail(currentUser.email);
        if (!tutor) {
          tutor = {
            ...currentUser,
            id: Date.now.toString(),
            availability: "part-time",
            skills: [],
            credentials: [],
            appliedRoles: [],
          };
          addTutor(tutor);
        }
        setTutorProfile(tutor);
      }
    };

    // Mock API call to fetch available courses
    const fetchCourses = async () => {
      // In a real application, this would be an API call
      setCourses(mockCourses);
    };

    fetchTutorProfile();
    fetchCourses();
  }, [currentUser]);

  const handleApplyForRole = (
    courseId: string,
    role: "tutor" | "lab-assistant"
  ) => {
    // In a real application, this would be an API call
    console.log(`Applied for ${role} role in course ${courseId}`);

    // Update local state to show the application
    if (tutorProfile) {
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        const newRole: TutorRole = {
          courseId,
          status: "pending",
          rank: 0,
          role,
        };

        const updateProfile: Tutor = {
          ...tutorProfile,
          appliedRoles: tutorProfile.appliedRoles
            ? [...tutorProfile.appliedRoles, newRole]
            : [newRole],
        };

        setTutorProfile(updateProfile);
        updateTutor(updateProfile);
      }
    }
  };

  const updateProfile = (updatedProfile: Partial<Tutor>) => {
    if (tutorProfile) {
      setTutorProfile({ ...tutorProfile, ...updatedProfile });
      updateTutor({ ...tutorProfile, ...updatedProfile });
    }
  };

  return (
    <TutorDashboardWrapper>
      <Dashboard header="Tutor Dashboard" navigateTo={navigateTo} />

      <nav>
        <ul>
          <li>
            <button
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => setActiveTab("profile")}
            >
              Profile Information
            </button>
          </li>
          <li>
            <button
              className={activeTab === "apply" ? "active" : ""}
              onClick={() => setActiveTab("apply")}
            >
              Apply for Roles
            </button>
          </li>
          <li>
            <button
              className={activeTab === "roles" ? "active" : ""}
              onClick={() => setActiveTab("roles")}
            >
              Applied Roles
            </button>
          </li>
        </ul>
      </nav>

      <main>
        {activeTab === "apply" && (
          <TutorApplication
            courses={courses}
            onApply={handleApplyForRole}
            tutorProfile={tutorProfile}
          />
        )}

        {activeTab === "roles" && tutorProfile && (
          <PreviousRoles roles={tutorProfile.appliedRoles || []} />
        )}

        {activeTab === "profile" && tutorProfile && (
          <ProfileInformation profile={tutorProfile} onUpdate={updateProfile} />
        )}
      </main>
    </TutorDashboardWrapper>
  );
};

export default TutorDashboard;
