import React from "react";
import TutorCard from "./tutorCard";
import { Tutor, TutorRole } from "../../types/Tutor";
import { loadTutors, saveTutors } from "../../util/localStorage";

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
    return (
      <p className="text-gray-500 text-center mt-6">No applicants found.</p>
    );
  }

  const handleUpdate = (update: { id: string; updatedRole: TutorRole }) => {
    const allTutors = loadTutors();

    const updatedList = allTutors.map((tutor) => {
      if (tutor.id === update.id) {
        const newRoles =
          tutor.appliedRoles?.map((role) =>
            role.courseId === update.updatedRole.courseId
              ? update.updatedRole
              : role
          ) ?? [];

        return {
          ...tutor,
          appliedRoles: newRoles,
        };
      }
      return tutor;
    });

    console.log(updatedList);

    saveTutors(updatedList);
  };

  return (
    <div className="tutor-list">
      {tutors.map((tutorApp, index) => (
        <TutorCard
          key={`${tutorApp.id}-${tutorApp.course}-${index}`}
          tutor={tutorApp}
          allTutors={tutors}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default TutorList;
