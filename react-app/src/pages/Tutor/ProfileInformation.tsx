// src/components/ProfileInformation.tsx
import React, { useState } from "react";
import { Tutor } from "../../types/Tutor";
import {
  AddCredentialWrapper,
  AddSkillWrapper,
  CredentialItem,
  CredentialList,
  FormGroupWrapper,
  ProfileInformationWrapper,
  RadioGroup,
  RemoveSkillsButton,
  Section,
  SkillList,
  SkillTag,
  SubmitButton,
} from "./element";

interface ProfileInformationProps {
  profile: Tutor;
  onUpdate: (updatedProfile: Partial<Tutor>) => void;
}

const ProfileInformation: React.FC<ProfileInformationProps> = ({
  profile,
  onUpdate,
}) => {
  const [availability, setAvailability] = useState<"part-time" | "full-time">(
    profile.availability
  );
  const [newSkill, setNewSkill] = useState<string>("");
  const [skills, setSkills] = useState<string[]>(profile.skills);

  const [newCredential, setNewCredential] = useState({
    degree: "",
    institution: "",
    year: new Date().getFullYear(),
  });

  const handleAddSkill = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      onUpdate({ skills: updatedSkills });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    onUpdate({ skills: updatedSkills });
  };

  const handleAvailabilityChange = (
    newAvailability: "part-time" | "full-time"
  ) => {
    setAvailability(newAvailability);
    onUpdate({ availability: newAvailability });
  };

  const handleAddCredential = () => {
    if (
      newCredential.degree.trim() !== "" &&
      newCredential.institution.trim() !== ""
    ) {
      const year = parseInt(newCredential.year.toString(), 10);

      if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
        return; // Invalid year
      }

      const updatedCredentials = [
        ...profile.credentials,
        {
          degree: newCredential.degree.trim(),
          institution: newCredential.institution.trim(),
          year,
        },
      ];

      onUpdate({ credentials: updatedCredentials });

      // Reset form
      setNewCredential({
        degree: "",
        institution: "",
        year: new Date().getFullYear(),
      });
    }
  };

  return (
    <ProfileInformationWrapper>
      <h2>Profile Information</h2>

      <Section>
        <div>
          <label>Full Name: </label>
          {profile.firstName + " " + profile.lastName}
        </div>
        <div>
          <label>Email: </label>
          {profile.email}
        </div>
      </Section>

      <Section>
        <h3>Availability</h3>
        <RadioGroup>
          <label>
            <input
              type="radio"
              name="availability"
              value="part-time"
              checked={availability === "part-time"}
              onChange={() => handleAvailabilityChange("part-time")}
            />
            Part Time
          </label>
          <label>
            <input
              type="radio"
              name="availability"
              value="full-time"
              checked={availability === "full-time"}
              onChange={() => handleAvailabilityChange("full-time")}
            />
            Full Time
          </label>
        </RadioGroup>
      </Section>

      <Section>
        <h3>Skills</h3>
        <SkillList>
          {skills.map((skill) => (
            <SkillTag key={skill}>
              {skill}
              <RemoveSkillsButton
                type="button"
                onClick={() => handleRemoveSkill(skill)}
              >
                ×
              </RemoveSkillsButton>
            </SkillTag>
          ))}
        </SkillList>

        <FormGroupWrapper>
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a new skill"
          />
          <SubmitButton type="button" onClick={handleAddSkill}>
            Add
          </SubmitButton>
        </FormGroupWrapper>
      </Section>

      <Section>
        <h3>Academic Credentials</h3>
        <CredentialList>
          {profile.credentials.map((credential, index) => (
            <CredentialItem key={index}>
              <div>
                <strong>Degree:</strong> {credential.degree}
              </div>
              <div>
                <strong>Institution:</strong> {credential.institution}
              </div>
              <div>
                <strong>Year:</strong> {credential.year}
              </div>
            </CredentialItem>
          ))}
        </CredentialList>

        <AddCredentialWrapper>
          <h4>Add New Credential</h4>
          <FormGroupWrapper>
            <label htmlFor="degree">Degree:</label>
            <input
              type="text"
              id="degree"
              value={newCredential.degree}
              onChange={(e) =>
                setNewCredential({ ...newCredential, degree: e.target.value })
              }
              placeholder="E.g., BSc Computer Science"
            />
          </FormGroupWrapper>

          <FormGroupWrapper>
            <label htmlFor="institution">Institution:</label>
            <input
              type="text"
              id="institution"
              value={newCredential.institution}
              onChange={(e) =>
                setNewCredential({
                  ...newCredential,
                  institution: e.target.value,
                })
              }
              placeholder="E.g., University of Technology"
            />
          </FormGroupWrapper>

          <FormGroupWrapper>
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              value={newCredential.year}
              onChange={(e) =>
                setNewCredential({
                  ...newCredential,
                  year:
                    parseInt(e.target.value, 10) || new Date().getFullYear(),
                })
              }
              min="1900"
              max={new Date().getFullYear()}
            />
          </FormGroupWrapper>

          <SubmitButton type="button" onClick={handleAddCredential}>
            Add Credential
          </SubmitButton>
        </AddCredentialWrapper>
      </Section>
    </ProfileInformationWrapper>
  );
};

export default ProfileInformation;
