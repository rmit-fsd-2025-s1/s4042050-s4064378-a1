import React, { useState ,useEffect} from "react";
import { Tutor } from "../../types/Tutor";
import TutorCard from "./tutorCard";

interface Props {
    tutors: Tutor[];
}

const TutorList: React.FC<Props> = ({ tutors }) => {

    const [localTutors, setLocaltutors] = useState<Tutor[]>(tutors);

    

    const handleUpdate = (updatedApplicant: Tutor) => {
        const updatedList = localTutors.map((tutor) =>
            tutor.id === updatedApplicant.id ? updatedApplicant : tutor
        );
        setLocaltutors(updatedList);
       
        console.log("Tutors")
        console.log(tutors)
      };
    
      useEffect(() => {
        console.log("📦 Tutors updated in TutorList:", tutors);
        setLocaltutors(tutors);
      }, [tutors]);


if (localTutors.length === 0) {
    return <p className="text-gray-500 text-center mt-6">No applicants found.</p>;
  }

  
  
  return (
    <div className="applicant-list">
      {localTutors.map((tutor) => (
        <TutorCard
          key={tutor.id}
          tutor={tutor}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default TutorList;