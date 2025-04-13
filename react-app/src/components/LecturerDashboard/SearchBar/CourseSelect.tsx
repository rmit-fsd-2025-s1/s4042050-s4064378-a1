import React from "react";
import { mockCourses } from "../../../mockData/mockData";

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const CourseSelect: React.FC<Props> = ({ value, onChange, disabled }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
      disabled={disabled}
    >
      <option value="all">All Courses</option>
      {mockCourses.map((course) => (
        <option key={course.id} value={course.id}>
          {course.name} ({course.code})
        </option>
      ))}
    </select>
  );
};

export default CourseSelect;
