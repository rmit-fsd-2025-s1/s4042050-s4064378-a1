import React from "react";
import { Tutor, TutorRole } from "../../types/Tutor";
import TutorCard from "./tutorCard";

interface Props {
  tutors: Tutor[];
}

// Keep firstName and lastName in the flattened type
interface TutorApplication extends Tutor {
  course: string;
  rank: number;
  status: "pending" | "accepted" | "rejected";
  appliedRole: TutorRole;
}

const TutorList: React.FC<Props> = ({ tutors }) => {
  const flattened: TutorApplication[] = tutors.flatMap((tutor) => {
    if (tutor.appliedRoles && tutor.appliedRoles.length > 0) {
      return tutor.appliedRoles.map((role) => ({
        ...tutor,
        course: role.courseId,
        rank: role.rank ?? 0,
        status: role.status,
        appliedRole: role,
      }));
    } else {
      return [{
        ...tutor,
        course: "N/A",
        rank: 0,
        status: "pending",
        appliedRole: {
          courseId: "N/A",
          role: "tutor",
          status: "pending",
          rank: 0,
        }
      }];
    }
  });

  if (flattened.length === 0) {
    return <p className="text-gray-500 text-center mt-6">No applicants found.</p>;
  }

  return (
    <div className="tutor-list">
      {flattened.map((tutorApp: TutorApplication, index) => (
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
