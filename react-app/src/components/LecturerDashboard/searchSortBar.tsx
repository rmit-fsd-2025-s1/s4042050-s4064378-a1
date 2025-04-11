import React, { useState, useEffect } from "react";
import { Tutor } from "../../types/Tutor";
import { SortOption } from "../../types/sortTypes";

interface Props {
  applicants: Tutor[];
  onFilteredListChange: (filtered: Tutor[]) => void;
}

const SearchSortBar: React.FC<Props> = ({
  applicants,
  onFilteredListChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("course");

  useEffect(() => {
    let updatedList = [...applicants];

    // Search
    if (searchQuery.trim() !== "") {
      updatedList = updatedList.filter(
        (applicant) =>
          applicant.firstName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          applicant.lastName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          applicant.course.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortOption === "course") {
      updatedList.sort((a, b) => a.course.localeCompare(b.course));
    } else if (sortOption === "availability") {
      updatedList.sort((a, b) => a.availability.localeCompare(b.availability));
    }

    onFilteredListChange(updatedList);
  }, [searchQuery, sortOption, applicants]);

  return (
    <div className="search-sort-bar flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-300 mb-6">
      <input
        type="text"
        placeholder="Search by name or course..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2"
      />

      <select
        onChange={(e) => setSortOption(e.target.value as SortOption)}
        className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
      >
        <option value="course">Sort by Course</option>
        <option value="availability">Sort by Availability</option>
      </select>
    </div>
  );
};

export default SearchSortBar;
