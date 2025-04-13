import React from "react";
import { SortOption } from "../../../types/sortTypes";

interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
  disabled: boolean;
  selectedCourseId: string;
}

const SortSelect: React.FC<Props> = ({ value, onChange, disabled, selectedCourseId }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
      disabled={disabled}
    >
      <option value="course" disabled={selectedCourseId !== "all"}>
        Sort by Course
      </option>
      <option value="availability">Sort by Availability</option>
    </select>
  );
};

export default SortSelect;
