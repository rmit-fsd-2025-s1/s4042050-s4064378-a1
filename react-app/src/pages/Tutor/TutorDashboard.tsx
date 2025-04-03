// src/pages/TutorDashboard.tsx
import React, { useState, useEffect } from "react";
import { Course, Tutor, TutorRole } from "../../types/Tutor";
import TutorApplication from "./TutorApplication";
import PreviousRoles from "./TutorPreviousRoles";
import ProfileInformation from "./ProfileInformation";
import { TutorDashboardWrapper } from "./elements";

const TutorDashboard: React.FC = () => {
  const [tutorProfile, setTutorProfile] = useState<Tutor | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<"apply" | "profile" | "roles">(
    "apply"
  );

  useEffect(() => {
    // Mock API call to fetch tutor profile
    const fetchTutorProfile = async () => {
      // In a real application, this would be an API call
      setTutorProfile({
        email: "abc@gmail.com",
        availability: "part-time",
        skills: ["JavaScript", "React", "Node.js"],
        credentials: [
          {
            degree: "BSc Computer Science",
            institution: "University of Technology",
            year: 2022,
          },
        ],
        appliedRoles: [
          {
            id: "1",
            courseId: "course1",
            courseCode: "COSC1234",
            courseName: "Web development",
            semester: "Fall 2024",
            role: "tutor",
            status: "pending",
          },
        ],
        firstName: "",
        lastName: "",
        role: "tutor",
        password: "abc",
      });
    };

    // Mock API call to fetch available courses
    const fetchCourses = async () => {
      // In a real application, this would be an API call
      setCourses([
        {
          id: "1",
          code: "COSC1234",
          name: "Web development",
          semester: "Spring 2024",
        },
        {
          id: "2",
          code: "COSC2345",
          name: "Full stack development",
          semester: "Spring 2024",
        },
        {
          id: "3",
          code: "COSC3456",
          name: "Artificial intelligence",
          semester: "Spring 2024",
        },
        {
          id: "4",
          code: "COSC4567",
          name: "Machine learning",
          semester: "Spring 2024",
        },
      ]);
    };

    fetchTutorProfile();
    fetchCourses();
  }, []);

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
          id: `new-${Date.now()}`,
          courseId,
          courseCode: course.code,
          courseName: course.name,
          semester: course.semester,
          status: "pending",
          role,
        };

        setTutorProfile({
          ...tutorProfile,
          appliedRoles: tutorProfile.appliedRoles
            ? [...tutorProfile.appliedRoles, newRole]
            : [newRole],
        });
      }
    }
  };

  const updateProfile = (updatedProfile: Partial<Tutor>) => {
    if (tutorProfile) {
      setTutorProfile({ ...tutorProfile, ...updatedProfile });
    }
  };

  return (
    <TutorDashboardWrapper>
      <header>
        <h1>Tutor Dashboard</h1>
      </header>

      <nav>
        <ul>
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
              Previous Roles
            </button>
          </li>
          <li>
            <button
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => setActiveTab("profile")}
            >
              Profile Information
            </button>
          </li>
        </ul>
      </nav>

      <main>
        {activeTab === "apply" && (
          <TutorApplication courses={courses} onApply={handleApplyForRole} />
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
