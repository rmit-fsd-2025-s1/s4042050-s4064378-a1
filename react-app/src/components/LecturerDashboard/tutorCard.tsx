import React, { useState } from "react";
import { Tutor } from "../../types/Tutor";
import { saveTutors, loadTutors } from "../../util/localStorage";

interface Props {
  tutor: Tutor;
  onUpdate: (updatedApplicant: Tutor) => void;
}

const TutorCard: React.FC<Props> = ({ tutor, onUpdate }) => {
  const [selected, setSelected] = useState(tutor.selected);
  const [comment, setComment] = useState(tutor.comment || "");
  const [rank, setRank] = useState(tutor.rank || 0);

  const handleSave = () => {
    const updatedTutor: Tutor = {
      ...tutor,
      selected,
      rank,
      comment,
    };

    const allTutors = loadTutors();
    const updatedList = allTutors.map((a) =>
      a.email === tutor.email ? updatedTutor : a
    );
    saveTutors(updatedList);

    
    onUpdate(updatedTutor);
  };

  return <></>;
};

return (
  <div className="applicant-card border rounded-lg shadow-md p-4 mb-4">
    <h2 className="text-lg font-semibold">{tutor.name}</h2>
    <p><strong>Email:</strong> {tutor.email}</p>
    <p><strong>Course:</strong> {tutor.course}</p>
    <p><strong>Availability:</strong> {tutor.availability}</p>
    <p><strong>Credentials:</strong> {tutor.credentials}</p>
    <p><strong>Skills:</strong> {tutor.skills.join(", ")}</p>

    <div className="mt-4">
      <label className="block mb-1">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => setSelected(e.target.checked)}
        />{" "}
        Select this applicant
      </label>

      <label className="block mt-2">
        Rank (1 - 10):
        <input
          type="number"
          min="1"
          max="10"
          value={rank}
          onChange={(e) => setRank(parseInt(e.target.value))}
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
