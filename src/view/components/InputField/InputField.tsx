import { Field } from 'formik';
import React from 'react';

interface InputFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
}) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </label>
      <Field
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '100%',
        }}
      />
    </div>
  );
};
