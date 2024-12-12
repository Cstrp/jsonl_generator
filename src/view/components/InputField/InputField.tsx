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
    <div className="my-1">
      <label htmlFor={name} className="block mb-0.5 uppercase">
        {label}
      </label>

      <Field
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        className="p-0.5, rounded-sm w-full"
      />
    </div>
  );
};
