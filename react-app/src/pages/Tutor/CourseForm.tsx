import React, { useState } from "react";
import FormField, { CourseFormProps } from "./FormField";
import { capitalizeName, validateCourseCode } from "../../util/validation";
import { CourseFormWrapper } from "./element";

const CourseForm: React.FC<CourseFormProps> = ({ onSubmit }) => {
  const [courseCode, setCourseCode] = useState<string>("");
  const [courseName, setCourseName] = useState<string>("");
  const [errors, setErrors] = useState<{ code?: string; name?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields
    const newErrors: { code?: string; name?: string } = {};

    if (!courseCode) {
      newErrors.code = "Course code is required";
    } else if (!validateCourseCode(courseCode)) {
      newErrors.code = "Course code must follow the format COSCxxxx";
    }

    if (!courseName) {
      newErrors.name = "Course name is required";
    }

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Format course name with first letter capitalized
    const formattedName = capitalizeName(courseName);

    // Submit form data
    onSubmit({
      code: courseCode.toUpperCase(),
      name: formattedName,
    });

    // Reset form
    setCourseCode("");
    setCourseName("");
    setErrors({});
  };

  return (
    <CourseFormWrapper onSubmit={handleSubmit}>
      <FormField
        id="courseCode"
        label="Course Code"
        type="text"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
        required
        placeholder="e.g., COSC1234"
        fieldName="Course Code"
      />

      <FormField
        id="courseName"
        label="Course Name"
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        required
        placeholder="e.g., Web Development"
        fieldName="Course Name"
      />

      <button type="submit" className="submit-button">
        Add Course
      </button>
    </CourseFormWrapper>
  );
};
export default CourseForm;
