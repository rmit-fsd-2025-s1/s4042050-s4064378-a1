import React from "react";
import TutorCard from "./tutorCard";
import { Tutor } from "../../types/Tutor";
import { TutorRole } from "../../types/Tutor";


export interface TutorApplication extends Tutor {
  course: string;
  rank: number;
  status: "pending" | "accepted" | "rejected";
  appliedRole: TutorRole;
}

interface Props {
  tutors: TutorApplication[]; 
}

const TutorList: React.FC<Props> = ({ tutors }) => {
  if (tutors.length === 0) {
    return <p className="text-gray-500 text-center mt-6">No applicants found.</p>;
  }

  return (
    <div className="tutor-list">
      {tutors.map((tutorApp, index) => (
        <TutorCard
          key={`${tutorApp.id}-${tutorApp.course}-${index}`}
          tutor={tutorApp}
          onUpdate={() => {}}
        />
      ))}
    </div>
  );
};

export default TutorList;
