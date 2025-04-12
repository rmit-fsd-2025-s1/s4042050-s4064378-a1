// src/components/PreviousRoles.tsx
import React from "react";
import { TutorRole } from "../../types/Tutor";
import { PreviousRolesHeading, RolesTable } from "./element";

interface PreviousRolesProps {
  roles: TutorRole[];
}

const PreviousRoles: React.FC<PreviousRolesProps> = ({ roles }) => {
  return (
    <div className="previous-roles">
      <PreviousRolesHeading>Previous Roles</PreviousRolesHeading>

      {roles.length === 0 ? (
        <p>You haven't had any previous roles.</p>
      ) : (
        <RolesTable>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Semester</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {/* {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.courseCode}</td>
                <td>
                  {role.courseName.charAt(0).toUpperCase() +
                    role.courseName.slice(1)}
                </td>
                <td>{role.semester}</td>
                <td>{role.role === "tutor" ? "Tutor" : "Lab Assistant"}</td>
              </tr>
            ))} */}
          </tbody>
        </RolesTable>
      )}
    </div>
  );
};

export default PreviousRoles;
