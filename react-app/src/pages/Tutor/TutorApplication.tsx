import React, { useState } from "react";
import { Course } from "../../types/Tutor";
import {
  CoursesList,
  CurrentSemesterCourses,
  FormGroupWrapper,
  RadioGroup,
  SubmitButton,
  TutorApplicationHeading,
  TutorApplicationSubHeading,
} from "./element";
import { ErrorMessage } from "../element";

interface TutorApplicationProps {
  courses: Course[];
  onApply: (courseId: string, role: "tutor" | "lab-assistant") => void;
}

const TutorApplication: React.FC<TutorApplicationProps> = ({
  courses,
  onApply,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<"tutor" | "lab-assistant">(
    "tutor"
  );
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourse) {
      setError("Please select a course");
      return;
    }

    onApply(selectedCourse, selectedRole);

    // Reset form
    setSelectedCourse("");
    setError("");
  };

  return (
    <div>
      <TutorApplicationHeading>
        Apply for Tutor/Lab Assistant Roles
      </TutorApplicationHeading>
      <TutorApplicationSubHeading>
        Select from available courses for the current semester
      </TutorApplicationSubHeading>

      <form onSubmit={handleSubmit}>
        <FormGroupWrapper>
          <label htmlFor="course">Course:</label>
          <select
            id="course"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code} -{" "}
                {course.name.charAt(0).toUpperCase() + course.name.slice(1)}
              </option>
            ))}
          </select>
        </FormGroupWrapper>

        <FormGroupWrapper>
          <label htmlFor="role">Role:</label>
          <RadioGroup>
            <label>
              <input
                type="radio"
                name="role"
                value="tutor"
                checked={selectedRole === "tutor"}
                onChange={() => setSelectedRole("tutor")}
              />
              Tutor
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="lab-assistant"
                checked={selectedRole === "lab-assistant"}
                onChange={() => setSelectedRole("lab-assistant")}
              />
              Lab Assistant
            </label>
          </RadioGroup>
        </FormGroupWrapper>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SubmitButton type="submit">Apply</SubmitButton>
      </form>

      <CurrentSemesterCourses>
        <h3>Available Courses - Spring 2024</h3>
        <CoursesList>
          {courses.map((course) => (
            <li key={course.id}>
              <strong>{course.code}</strong> -{" "}
              {course.name.charAt(0).toUpperCase() + course.name.slice(1)}
            </li>
          ))}
        </CoursesList>
      </CurrentSemesterCourses>
    </div>
  );
};

export default TutorApplication;
