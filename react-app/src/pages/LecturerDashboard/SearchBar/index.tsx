import React, { useState, useEffect } from "react";
import { Tutor, TutorApplication, TutorRole } from "../../../types/Tutor";
import { SortOption } from "../../../types/sortTypes";
import { mockCourses } from "../../../mockData/mockData";
import SearchBar from "./SearchBar";
import SortByCourseOrAvailability from "./SortByCourseOrAvailability";
import CourseBasedFilter from "./CourseBasedFilter";
import SelectionFilter from "./SelectionFilter";
import { Filter } from "../styles/Filters";



interface Props {
  onFilteredchangedList: (filtered: TutorApplication[]) => void;
  TutorApplicants: Tutor[];
  onViewModeChange: (viewMode: string) => void;
}

const SearchSortBar: React.FC<Props> = ({
  TutorApplicants,
  onFilteredchangedList,
  onViewModeChange,
}) => {
  //Sort for, by availability of course
  const [sortByCourseAvailability, setsortByCourseAvailability] = useState<SortOption>("course");
  //Filter tutors based on most selected, lease selected not selected
  const [tutorSelectFilter, setTutorSelectFilter] = useState("all");
  // Query tutor based on name, course,skill availability
  const [userSearchQuery, setuserSearchQuery] = useState("");
  //Filter by course
  const [filterByCourse, setfilterByCourse] = useState("all");


  useEffect(() => {
    onViewModeChange(tutorSelectFilter);
    const searchQuery = userSearchQuery.toLowerCase().trim();

    if (["unselected", "least", "most"].includes(tutorSelectFilter)) {
      //The most selected least selected and usnelected user ids are mapped 
      const tutorSelectionMap = new Map<string, number>();
      TutorApplicants.forEach((tutor) => {
        const count = tutor.appliedRoles?.filter((r) => r.status === "accepted").length ?? 0;
        tutorSelectionMap.set(tutor.id, count);
      });

      let mostSelectedTutorId = "";
      let leastSelectedTutorId = "";
      let maxCount = -1;
      let minCount = Infinity;

      tutorSelectionMap.forEach((c, id) => {
        if (c > maxCount) {
          maxCount = c;
          mostSelectedTutorId = id;
        }
        if (c > 0 && c < minCount) {
          minCount = c;
          leastSelectedTutorId = id;
        }
      });

      //Based on the filter selected tutors are assigned
      const filtered: TutorApplication[] = TutorApplicants
        .filter((t) => {
          const count = tutorSelectionMap.get(t.id) ?? 0;
          if (tutorSelectFilter === "most") return t.id === mostSelectedTutorId;
          if (tutorSelectFilter === "least") return t.id === leastSelectedTutorId;
          if (tutorSelectFilter === "unselected") return count === 0;
          return true;
        })
        .map((t) => {
          const role = t.appliedRoles?.[0];
          return {
            ...t,
            rank: role?.rank ?? 0,
            appliedRole: role!,
            status: role?.status ?? "pending",
            course: role?.courseId ?? "",

          };
        });

      onFilteredchangedList(filtered);
      return;
    }

    // Filter the user based on selected courses
    // Query tutor based on name, course,skill availability
    // Tutors who match both filter and query are selcted and stored in SelectedTutors
    const SelectedTutors: TutorApplication[] = [];
    // Tutors are filterd based on course
    TutorApplicants.forEach((tutor) => {
      if (!tutor.appliedRoles?.length) return;
      tutor.appliedRoles.forEach((role) => {
        const courseName = mockCourses.find((c) => c.id === role.courseId)?.name.toLowerCase() ?? "";
        const filteredTutorByCourse = filterByCourse === "all" || role.courseId === filterByCourse;

        //Tutors are quiried based on name, course,skill availability
        const quriedTutors =
          searchQuery === "" ||
          `${tutor.firstName} ${tutor.lastName}`.toLowerCase().includes(searchQuery) ||
          tutor.availability?.toLowerCase().includes(searchQuery) ||
          tutor.skills?.some((skill) => skill.toLowerCase().includes(searchQuery)) ||
          courseName.includes(searchQuery);
        // If a tutor match both conditions inserted into SelectedTutors
        if (filteredTutorByCourse && quriedTutors) {
          SelectedTutors.push({
            ...tutor,
            rank: role.rank ?? 0,
            appliedRole: role,
            course: role.courseId,
            status: role.status,

          });
        }
      });
    });

    // Sorting tutors based on course or availability.
    // Sorting by course is only enabled only if course filter is all
    if (sortByCourseAvailability === "course" && filterByCourse === "all") {
      SelectedTutors.sort((a, b) => a.course.localeCompare(b.course));
    } else if (sortByCourseAvailability === "availability") {
      SelectedTutors.sort((a, b) => a.availability.localeCompare(b.availability));
    }

    onFilteredchangedList(SelectedTutors);
  }, [userSearchQuery, sortByCourseAvailability, filterByCourse, tutorSelectFilter, TutorApplicants]);

  // For each filter and sorting tasks different components are created and used here
  return (
    <Filter>
      <SearchBar value={userSearchQuery} onChange={setuserSearchQuery} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", width: "100%" }}>
        <SortByCourseOrAvailability
          value={sortByCourseAvailability}
          onChange={setsortByCourseAvailability}
          disabled={["most", "least", "unselected"].includes(tutorSelectFilter)}
          selectedCourseId={filterByCourse}
        />

        <CourseBasedFilter
          value={filterByCourse}
          onChange={setfilterByCourse}
          disabled={["least", "most", "unselected"].includes(tutorSelectFilter)}
        />

        <SelectionFilter value={tutorSelectFilter} onChange={setTutorSelectFilter} />
      </div>
    </Filter>

  );
};

export default SearchSortBar;
