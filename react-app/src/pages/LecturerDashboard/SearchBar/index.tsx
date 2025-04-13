import React, { useState, useEffect } from "react";
import { Tutor, TutorRole } from "../../../types/Tutor";
import { SortOption } from "../../../types/sortTypes";
import { mockCourses } from "../../../mockData/mockData";
import SearchInput from "./SearchInput";
import SortSelect from "./SortSelect";
import CourseSelect from "./CourseSelect";
import SelectionFilter from "./SelectionFilter";

export interface TutorApplication extends Tutor {
  course: string;
  rank: number;
  status: "pending" | "accepted" | "rejected";
  appliedRole: TutorRole;
}

interface Props {
  applicants: Tutor[];
  onFilteredListChange: (filtered: TutorApplication[]) => void;
  onViewModeChange: (viewMode: string) => void;
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
    onViewModeChange(selectionFilter);
    const search = searchQuery.toLowerCase().trim();

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
          const role = tutor.appliedRoles?.[0];
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

    const matched: TutorApplication[] = [];
    applicants.forEach((tutor) => {
      if (!tutor.appliedRoles?.length) return;
      tutor.appliedRoles.forEach((role) => {
        const matchesCourse = selectedCourseId === "all" || role.courseId === selectedCourseId;
        const courseName = mockCourses.find((c) => c.id === role.courseId)?.name.toLowerCase() ?? "";

        const matchesSearch =
          search === "" ||
          `${tutor.firstName} ${tutor.lastName}`.toLowerCase().includes(search) ||
          tutor.availability?.toLowerCase().includes(search) ||
          tutor.skills?.some((skill) => skill.toLowerCase().includes(search)) ||
          courseName.includes(search);

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
      <SearchInput value={searchQuery} onChange={setSearchQuery} />
      <SortSelect
        value={sortOption}
        onChange={setSortOption}
        disabled={["most", "least", "unselected"].includes(selectionFilter)}
        selectedCourseId={selectedCourseId}
      />
      <CourseSelect
        value={selectedCourseId}
        onChange={setSelectedCourseId}
        disabled={["most", "least", "unselected"].includes(selectionFilter)}
      />
      <SelectionFilter value={selectionFilter} onChange={setSelectionFilter} />
    </div>
  );
};

export default SearchSortBar;
