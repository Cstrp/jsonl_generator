import styled from '@emotion/styled';
import { Field, useField } from 'formik';
import React from 'react';

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  color: var(--foreground);
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 2px var(--accent-hover);
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
`;

const ErrorMessage = styled.div`
  color: var(--error);
  font-size: 0.75rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &::before {
    content: '⚠️';
    font-size: 0.875rem;
  }
`;

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
  const [field, meta] = useField(name);

  return (
    <InputContainer>
      <Label htmlFor={name}>{label}</Label>
      <StyledField id={name} type={type} placeholder={placeholder} {...field} />
      {meta.touched && meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
    </InputContainer>
  );
};
