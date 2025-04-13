import { Tutor } from "../../types/Tutor";

interface Props {
  tutor: Tutor;
}

const TutorOverviewCard: React.FC<Props> = ({ tutor }) => {
  const acceptedCourses = tutor.appliedRoles?.filter(r => r.status === "accepted") ?? [];

  return (
    <div className="border rounded shadow p-4 bg-white">
      <h2 className="text-lg font-semibold mb-1">{tutor.firstName} {tutor.lastName}</h2>
      <p><strong>Email:</strong> {tutor.email}</p>
      <p><strong>Availability:</strong> {tutor.availability}</p>
      <p><strong>Skills:</strong> {tutor.skills.join(", ")}</p>

      <p className="mt-2"><strong>Accepted Courses:</strong></p>
      <ul className="list-disc list-inside">
        {acceptedCourses.length === 0 ? (
          <li className="text-gray-500">None</li>
        ) : (
          acceptedCourses.map((role, index) => (
            <li key={index}>Course ID: {role.courseId} (Rank: {role.rank})</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TutorOverviewCard;
