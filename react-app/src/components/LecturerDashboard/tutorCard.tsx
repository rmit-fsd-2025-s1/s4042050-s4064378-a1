import React, { useState } from "react";
import { Tutor } from "../../types/Tutor";
import { saveTutors, loadTutors } from "../../util/localStorage";
import "./styles/tutorCard.css";

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

  return (
    <div className="tutor-card">
      <h2>{tutor.firstName + " " + tutor.lastName}</h2>
      <p>
        <strong>Email:</strong> {tutor.email}
      </p>
      <p>
        <strong>Course:</strong> {tutor.course}
      </p>
      <p>
        <strong>Availability:</strong> {tutor.availability}
      </p>
      <p>
        <strong>Skills:</strong> {tutor.skills.join(", ")}
      </p>

      <div className="tutor-controls">
        <label>
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => setSelected(e.target.checked)}
          />
          Select this applicant
        </label>

        <label>
          Rank (1 - 10):
          <input
            type="number"
            min="1"
            max="10"
            value={rank}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setRank(isNaN(val) ? 0 : val);
            }}
          />
        </label>

        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </label>

        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default TutorCard;
