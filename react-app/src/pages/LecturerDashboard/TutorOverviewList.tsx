import React from "react";
import { Tutor } from "../../types/Tutor";
import TutorOverviewCard from "./TutorOverviewCard";

interface Props {
  tutors: Tutor[];
}

const TutorOverviewList: React.FC<Props> = ({ tutors }) => {
  // ✅ Ensure uniqueness by ID
  const uniqueTutors = Array.from(new Map(tutors.map(t => [t.id, t])).values());

  if (uniqueTutors.length === 0) {
    return <p className="text-gray-500 text-center mt-6">No applicants found.</p>;
  }

  return (
    <div className="tutor-overview-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {uniqueTutors.map((tutor) => (
        <TutorOverviewCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
};

export default TutorOverviewList;
