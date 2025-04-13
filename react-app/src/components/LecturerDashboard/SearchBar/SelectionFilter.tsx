import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SelectionFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
    >
      <option value="all">All Selection States</option>
      <option value="most">Most Chosen Applicant</option>
      <option value="least">Least Chosen Applicant</option>
      <option value="unselected">Not Selected Applicants</option>
    </select>
  );
};

export default SelectionFilter;
