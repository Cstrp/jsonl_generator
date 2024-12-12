import styled from '@emotion/styled';
import { FieldArray, Formik, Form as FormikForm } from 'formik';
import { FC, useEffect } from 'react';
import * as Yup from 'yup';
import { generateJSONLFile } from '../../../data/utils/generateJSONLFile';
import { InputField } from '../InputField/InputField';

const FormContainer = styled.div`
  margin-top: 2rem;
  background: var(--card-bg);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--border);
  box-shadow: 0 4px 6px var(--shadow);
`;

const StyledForm = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Section = styled.div`
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--foreground);
  background: linear-gradient(to right, var(--accent), var(--accent-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const InputGroup = styled.div`
  background: var(--primary);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid var(--border);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px var(--shadow);
    transform: translateY(-2px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return 'var(--accent)';
      case 'secondary':
        return 'var(--primary)';
      case 'danger':
        return 'var(--error)';
      default:
        return 'var(--accent)';
    }
  }};
  color: ${({ variant }) =>
    variant === 'secondary' ? 'var(--foreground)' : 'white'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px var(--shadow);
    background: ${({ variant }) => {
      switch (variant) {
        case 'primary':
          return 'var(--accent-hover)';
        case 'secondary':
          return 'var(--secondary)';
        case 'danger':
          return 'var(--error)';
        default:
          return 'var(--accent-hover)';
      }
    }};
  }
`;

interface FormValues {
  prompt: string;
  inputs: { req: string; res: string }[];
}

interface FormProps {
  onSubmit: (values: FormValues) => void;
  onChange: (values: FormValues) => void;
}

const validationSchema = Yup.object({
  prompt: Yup.string().required('Prompt is required'),
  inputs: Yup.array().of(
    Yup.object({
      req: Yup.string().required('Request is required'),
      res: Yup.string().required('Response is required'),
    }),
  ),
});

export const Form: FC<FormProps> = ({ onChange, onSubmit }) => {
  const initialValues: FormValues = {
    prompt: '',
    inputs: [{ req: '', res: '' }],
  };

  const handleSubmit = (values: FormValues) => {
    const jsonlContent = values.inputs.map((input) => ({
      messages: [
        { role: 'system', content: values.prompt },
        { role: 'user', content: input.req },
        { role: 'assistant', content: input.res },
      ],
    }));

    generateJSONLFile(jsonlContent.map((item) => JSON.stringify(item)));
    onSubmit(values);
  };

  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          useEffect(() => {
            onChange(values);
          }, [values, onChange]);

          return (
            <StyledForm>
              <Section>
                <SectionTitle>System Prompt</SectionTitle>
                <InputField
                  name="prompt"
                  label="Prompt"
                  placeholder="Enter your system prompt..."
                />
              </Section>

              <FieldArray name="inputs">
                {({ remove, push, form }) => (
                  <Section>
                    <SectionTitle>Request & Response Pairs</SectionTitle>
                    {values.inputs.map((_, index) => (
                      <InputGroup key={index}>
                        <InputField
                          name={`inputs.${index}.req`}
                          label="Request"
                          placeholder="Enter user request..."
                        />
                        <InputField
                          name={`inputs.${index}.res`}
                          label="Response"
                          placeholder="Enter assistant response..."
                        />
                        <ButtonGroup>
                          <Button
                            type="button"
                            variant="danger"
                            onClick={() => remove(index)}
                          >
                            Remove Pair
                          </Button>
                        </ButtonGroup>
                      </InputGroup>
                    ))}
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => push({ req: '', res: '' })}
                    >
                      Add Request/Response Pair
                    </Button>
                  </Section>
                )}
              </FieldArray>

              <Button type="submit" variant="primary">
                Generate JSONL File
              </Button>
            </StyledForm>
          );
        }}
      </Formik>
    </FormContainer>
  );
};
