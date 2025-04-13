import React from "react";
import { validateField } from "../../util/validation";
import { RequiredIndicator } from "./element";

interface FormFieldProps {
  id: string;
  label: string;
  type: "text" | "number" | "select";
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  min?: number;
  max?: number;
  options?: { value: string; label: string }[];
  placeholder?: string;
  fieldName?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  min,
  max,
  options = [],
  placeholder = "",
  fieldName = "",
}) => {
  const [error, setError] = React.useState<string>("");

  // Handle blur on select
  const handleBlur = () => {
    const validation = validateField(
      value.toString(),
      fieldName || label,
      required
    );

    setError(validation.error);
  };

  return (
    <div>
      <label htmlFor={id}>
        {label}
        {required && <RequiredIndicator>*</RequiredIndicator>}
      </label>

      {type === "select" ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          required={required}
        >
          <option value="">{placeholder || `Select ${label}`}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          required={required}
          min={min}
          max={max}
          placeholder={placeholder}
        />
      )}

      {error && <div>{error}</div>}
    </div>
  );
};

export default FormField;

export interface CourseFormProps {
  onSubmit: (courseData: { code: string; name: string }) => void;
}
