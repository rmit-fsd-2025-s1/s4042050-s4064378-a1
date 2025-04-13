import React, { useState } from "react";
import { TutorApplication } from "./tutorList";
import { TutorRole } from "../../types/Tutor";
import { getCourseDisplay } from "../../util/getCourseByID";

interface Props {
  tutor: TutorApplication;
  onUpdate: (update: { id: string; updatedRole: TutorRole }) => void;
  allTutors: TutorApplication[];
}

const TutorCard: React.FC<Props> = ({ tutor, onUpdate, allTutors }) => {
  const [status, setStatus] = useState<"pending" | "accepted" | "rejected">(tutor.status);
  const [rank, setRank] = useState<number>(tutor.rank);
  const [error, setError] = useState<string>("");

  const handleSave = () => {
    setError("");

    if (status !== "accepted") {
      setError("Please mark the applicant as accepted before assigning a rank.");
      return;
    }

    const duplicate = allTutors.find(
      (t) =>
        t.appliedRole.courseId === tutor.course &&
        t.appliedRole.rank === rank &&
        t.appliedRole.status === "accepted"
    );

    if (duplicate) {
      setError(`Rank ${rank} is already assigned to another accepted applicant for this course.`);
      return;
    }

    const updated = {
      id: tutor.id,
      updatedRole: {
        courseId: tutor.course,
        role: tutor.appliedRole.role,
        rank,
        status,
      },
    };

    onUpdate(updated);
  };

  return (
    <div className="tutor-card border rounded-lg shadow-md p-6 mb-6 bg-white">
      <h2 className="text-xl font-bold mb-2">
        {tutor.firstName} {tutor.lastName}
      </h2>
      <p><strong>Email:</strong> {tutor.email}</p>
      <p><strong>Applied Course:</strong> {getCourseDisplay(tutor.course)}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Availability:</strong> {tutor.availability}</p>
      <p><strong>Skills:</strong> {tutor.skills.join(", ")}</p>

      <div className="mt-4">
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={status === "accepted"}
            onChange={(e) =>
              setStatus(e.target.checked ? "accepted" : "rejected")
            }
          />{" "}
          Mark as accepted
        </label>

        <label className="block mt-2">
          Rank (1 - 10):
          <input
            type="number"
            min={1}
            max={10}
            value={rank}
            disabled={status !== "accepted"}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setRank(isNaN(val) ? 0 : val);
            }}
            className="ml-2 border px-2 py-1 w-16"
          />
        </label>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

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
