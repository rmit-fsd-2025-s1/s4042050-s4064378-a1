import React, { useState, useEffect } from "react";
import { Tutor, TutorRole } from "../../types/Tutor";
import { SortOption } from "../../types/sortTypes";
import { mockCourses } from "../../mockData/mockData"

interface Props {
  applicants: Tutor[];
  onFilteredListChange: (filtered: TutorApplication[]) => void;
}

export interface TutorApplication extends Tutor {
  course: string;
  rank: number;
  status: "pending" | "accepted" | "rejected";
  appliedRole: TutorRole;
}

const SearchSortBar: React.FC<Props> = ({ applicants, onFilteredListChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("course");
  const [selectedCourseId, setSelectedCourseId] = useState("all");

  useEffect(() => {
    const matched: TutorApplication[] = [];

    applicants.forEach((tutor) => {
      if (!tutor.appliedRoles?.length) return;

      tutor.appliedRoles.forEach((role) => {
        const matchesCourse =
          selectedCourseId === "all" || role.courseId === selectedCourseId;

        const matchesSearch =
          searchQuery.trim() === "" ||
          tutor.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tutor.lastName?.toLowerCase().includes(searchQuery.toLowerCase());

        if (matchesCourse && matchesSearch) {
          matched.push({
            ...tutor,
            course: role.courseId,
            rank: role.rank ?? 0,
            status: role.status,
            appliedRole: role,
          });
        }
      });
    });

    // Sorting
    if (sortOption === "course") {
      matched.sort((a, b) => a.course.localeCompare(b.course));
    } else if (sortOption === "availability") {
      matched.sort((a, b) => a.availability.localeCompare(b.availability));
    }

    onFilteredListChange(matched);
  }, [searchQuery, sortOption, selectedCourseId, applicants]);

  return (
    <div className="search-sort-bar flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-300 mb-6">
      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
      />

      {/* 🔃 Sort Dropdown */}
      <select
        onChange={(e) => setSortOption(e.target.value as SortOption)}
        className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
      >
        <option value="course">Sort by Course</option>
        <option value="availability">Sort by Availability</option>
      </select>

      {/* 🎓 Course Filter Dropdown */}
      <select
        value={selectedCourseId}
        onChange={(e) => setSelectedCourseId(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
      >
        <option value="all">All Courses</option>
        {mockCourses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.name} ({course.code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchSortBar;
