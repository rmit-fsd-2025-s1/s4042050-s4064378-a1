import React, { useState } from "react";
import { Tutor } from "../../types/Tutor";
import {
  saveApplicantsToLocalStorage,
  loadTutors,
} from "../../util/localStorage";

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
    saveApplicantsToLocalStorage(updatedList);

    // Notify parent
    onUpdate(updatedTutor);
  };

  return <></>;
};

export default TutorCard;
