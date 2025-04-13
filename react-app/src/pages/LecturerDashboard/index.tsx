import React, { useEffect, useState } from "react";
import { Tutor ,TutorApplication} from "../../types/Tutor";
import { SortOption } from "../../types/sortTypes"
import { loadTutors } from "../../util/localStorage"
import TutorList from "./tutorList"
import SearchSortBar from "./SearchBar/index"
import "./styles/index.css"
import TutorOverviewList from "./TutorOverviewList"
import { PageWrapper, Title } from "./styles/Layout";
import { DashboardHeader } from "./styles/Header";
import { Dashboard } from "../../components/DashBoard";



export const LecturerPage = ({navigateTo}:{navigateTo:(page: any) => void;}) => {
  const [tutors, setTutors] = useState<Tutor[]>([])
  const [filteredTutors, setFilteredTutors] = useState<TutorApplication[]>([])
  const [query, setQuery] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("course");
  const [viewMode, setViewMode] = useState("all");

  useEffect(() => {
    //saveTutors(); // seeds mock data
    const data = loadTutors();
    console.log("Loaded from localStorage:", data);
    setTutors(data);
  }, []);

  useEffect(() => {
    console.log("📦 tutors state updated:", tutors);
  }, [tutors]);


  return (
    <PageWrapper>
      <Dashboard header={"🎓 Lecturer Dashboard"} navigateTo={navigateTo} />
      <SearchSortBar
        TutorApplicants={tutors}
        onFilteredchangedList={setFilteredTutors}
        onViewModeChange={setViewMode}
      />
      {["most", "least", "unselected"].includes(viewMode) ? (
        <TutorOverviewList tutors={filteredTutors} />
      ) : (
        <TutorList tutors={filteredTutors} />
      )}
    </PageWrapper>
  );

};