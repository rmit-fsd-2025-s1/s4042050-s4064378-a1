import React, {useEffect, useState} from "react";
import {Tutor} from "../../types/Tutor";
import {SortOption} from "../../types/sortTypes"
import {saveTutors} from "../../util/addTutors"
import {loadTutors} from "../../util/localStorage"
import TutorList from "./tutorList"
import SearchSortBar from "./searchSortBar"
import "./styles/index.css"
import { TutorApplication } from "./searchSortBar";
import TutorOverviewList from "./TutorOverviewList"


export const LecturerPage = () => {
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
  <div className="lecturer-dashboard">
    <SearchSortBar
      applicants={tutors}
      onFilteredListChange={setFilteredTutors}
      onViewModeChange={setViewMode}
    />
    {["most", "least", "unselected"].includes(viewMode)  ? (
      <TutorOverviewList tutors={filteredTutors} />
    ) : (
      <TutorList tutors={filteredTutors} />
    )}
  </div>
);
};