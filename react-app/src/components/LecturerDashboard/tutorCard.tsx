import React, { useState } from "react";
import { getCourseDisplay } from "../../util/getCourseByID";

interface Props {
  tutor: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    course: string;
    availability: "full-time" | "part-time";
    skills: string[];
    credentials: {
      degree: string;
      institution: string;
      year: number;
    }[];
    role: string;
    rank: number;
    status: "pending" | "accepted" | "rejected";
  };
  onUpdate: (updatedApplicant: any) => void;
}

const TutorCard: React.FC<Props> = ({ tutor, onUpdate }) => {
  const [selected, setSelected] = useState(false);
  const [comment, setComment] = useState("");
  const [rank, setRank] = useState<number>(tutor.rank);

  const handleSave = () => {
    alert(`Saved ${tutor.firstName} ${tutor.lastName} for course ${tutor.course} with rank ${rank}`);
    // You can call onUpdate here if needed
  };

  const courseDisplay = getCourseDisplay(tutor.course);

  return (
    <div className="tutor-card border rounded-lg shadow-md p-6 mb-6 bg-white">
      <h2 className="text-xl font-bold mb-2">
        {tutor.firstName} {tutor.lastName}
      </h2>
      <p><strong>Email:</strong> {tutor.email}</p>
      <p><strong>Applied Course:</strong> {courseDisplay}</p>
      <p><strong>Status:</strong> {tutor.status}</p>
      <p><strong>Availability:</strong> {tutor.availability}</p>
      <p><strong>Skills:</strong> {tutor.skills.join(", ")}</p>

      <div className="mt-4">
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => setSelected(e.target.checked)}
          /> Select this applicant
        </label>

        <label className="block mt-2">
          Rank (1 - 10):
          <input
            type="number"
            min={1}
            max={10}
            value={rank}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setRank(isNaN(val) ? 0 : val);
            }}
            className="ml-2 border px-2 py-1 w-16"
          />
        </label>

        <label className="block mt-2">
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="block mt-1 w-full border px-2 py-1"
          />
        </label>

        <button
          onClick={handleSave}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TutorCard;
