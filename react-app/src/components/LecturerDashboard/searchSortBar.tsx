import React, { useState, useEffect } from "react";
import { Tutor, TutorRole } from "../../types/Tutor";
import { SortOption } from "../../types/sortTypes";
import { mockCourses } from "../../mockData/mockData";

interface Props {
  applicants: Tutor[];
  onFilteredListChange: (filtered: TutorApplication[]) => void;
  onViewModeChange: (viewMode: string) => void;
}

export interface TutorApplication extends Tutor {
  course: string;
  rank: number;
  status: "pending" | "accepted" | "rejected";
  appliedRole: TutorRole;
}

const SearchSortBar: React.FC<Props> = ({
  applicants,
  onFilteredListChange,
  onViewModeChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("course");
  const [selectedCourseId, setSelectedCourseId] = useState("all");
  const [selectionFilter, setSelectionFilter] = useState("all");

  useEffect(() => {
    onViewModeChange(selectionFilter); // notify parent

    // Overview mode flattened by tutor (1 application per tutor)
    if (["most", "least", "unselected"].includes(selectionFilter)) {
      const selectionCountMap = new Map<string, number>();
      applicants.forEach((tutor) => {
        const count = tutor.appliedRoles?.filter((r) => r.status === "accepted").length ?? 0;
        selectionCountMap.set(tutor.id, count);
      });

      let mostSelectedId = "";
      let leastSelectedId = "";
      let max = -1;
      let min = Infinity;

      selectionCountMap.forEach((count, id) => {
        if (count > max) {
          max = count;
          mostSelectedId = id;
        }
        if (count > 0 && count < min) {
          min = count;
          leastSelectedId = id;
        }
      });

      const filtered: TutorApplication[] = applicants
        .filter((tutor) => {
          const count = selectionCountMap.get(tutor.id) ?? 0;
          if (selectionFilter === "most") return tutor.id === mostSelectedId;
          if (selectionFilter === "least") return tutor.id === leastSelectedId;
          if (selectionFilter === "unselected") return count === 0;
          return true;
        })
        .map((tutor) => {
          const role = tutor.appliedRoles?.[0]; // pick the first applied role
          return {
            ...tutor,
            course: role?.courseId ?? "",
            rank: role?.rank ?? 0,
            status: role?.status ?? "pending",
            appliedRole: role!,
          };
        });

      onFilteredListChange(filtered);
      return;
    }

    // Default mode: fully flatten all matching applications
    const matched: TutorApplication[] = [];

    applicants.forEach((tutor) => {
      if (!tutor.appliedRoles?.length) return;

      const matchesSearch =
        searchQuery.trim() === "" ||
        tutor.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.lastName?.toLowerCase().includes(searchQuery.toLowerCase());

      tutor.appliedRoles.forEach((role) => {
        const matchesCourse =
          selectedCourseId === "all" || role.courseId === selectedCourseId;

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

    if (sortOption === "course" && selectedCourseId === "all") {
      matched.sort((a, b) => a.course.localeCompare(b.course));
    } else if (sortOption === "availability") {
      matched.sort((a, b) => a.availability.localeCompare(b.availability));
    }

    onFilteredListChange(matched);
  }, [searchQuery, sortOption, selectedCourseId, selectionFilter, applicants]);

  return (
    <div className="search-sort-bar flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-300 mb-6">

      <input
        type="text"
        placeholder="Search by name..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
      />

      <select
        onChange={(e) => setSortOption(e.target.value as SortOption)}
        value={sortOption}
        className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
        disabled={["most", "least", "unselected"].includes(selectionFilter)}
      >
        <option value="course" disabled={selectedCourseId !== "all"}>
          Sort by Course
        </option>
        <option value="availability">Sort by Availability</option>
      </select>

      <select
        value={selectedCourseId}
        onChange={(e) => setSelectedCourseId(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
        disabled={["most", "least", "unselected"].includes(selectionFilter)}
      >
        <option value="all">All Courses</option>
        {mockCourses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.name} ({course.code})
          </option>
        ))}
      </select>

      <select
        value={selectionFilter}
        onChange={(e) => setSelectionFilter(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
      >
        <option value="all">All Selection States</option>
        <option value="most">Most Chosen Applicant</option>
        <option value="least">Least Chosen Applicant</option>
        <option value="unselected">Not Selected Applicants</option>
      </select>
    </div>
  );
};

export default SearchSortBar;
