import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by tutor name, course, availability, skills..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
    />
  );
};

export default SearchInput;
