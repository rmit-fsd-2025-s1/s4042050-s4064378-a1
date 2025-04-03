import React, {useEffect, useState} from "react";
import {Tutor} from "../../types/Tutor";
import {SortOption} from "../../types/sortTypes"
import {saveTutors} from "../../util/addTutors"
import {loadTutors} from "../../util/localStorage"
import TutorList from "./tutorList"
import SearchSortBar from "./searchSortBar"


export const LecturerPage = () => {
    const [tutors, setTutors] = useState<Tutor[]>([])
    const [filteredTutors, setFilteredTutors] = useState<Tutor[]>([])
    const [query, setQuery] = useState("")
    const [sortOption, setSortOption] = useState<SortOption>("course");

    useEffect(() => {
      saveTutors(); // seeds mock data
      const data = loadTutors();
      console.log("Loaded from localStorage:", data); // 👈 LOG 1
      setTutors(data);
      setFilteredTutors(data);
    }, []);
    
    useEffect(() => {
      console.log("📦 tutors state updated:", tutors); // 👈 LOG 2
    }, [tutors]);

  //  <ChartsPanel applicants={filteredTutors} />
return (
    <div className="lecturer-dashboard">
      <SearchSortBar 
        applicants={tutors}
        onFilteredListChange={setFilteredTutors}
      />
      <TutorList tutors={filteredTutors} />
     
    </div>
  );
};