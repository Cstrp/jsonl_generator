import styled from '@emotion/styled';
import { FieldArray, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import React from 'react';
import * as Yup from 'yup';
import { generateJSONLFile } from '../../../data/utils/generateJSONLFile';
import { InputField } from '../InputField/InputField';

interface FormValues {
  prompt: string;
  inputs: { req: string; res: string }[];
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

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  padding-right: 1rem;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

const StyledForm = styled(Form)`
  width: 100%;
  padding: 2rem;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background-color: var(--card-bg);
  box-shadow: 0 4px 6px var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 12px var(--hover-shadow);
    transform: translateY(-2px);
  }
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: var(--button-bg);
  color: var(--button-text);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow);
  }
`;

export const DynamicForm: React.FC<{
  onSubmit: (values: FormValues) => void;
  onChange: (values: FormValues) => void;
}> = ({ onSubmit, onChange }) => {
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

    const filename = Date.now().toString();

    generateJSONLFile(
      jsonlContent.map((item) => JSON.stringify(item)),
      filename,
    );
    console.log('Generated JSONL:', jsonlContent);
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => {
        React.useEffect(() => {
          onChange(values);
        }, [values, onChange]);

        return (
          <FormContainer>
            <StyledForm>
              <InputField
                name="prompt"
                label="Prompt"
                placeholder="Enter your prompt"
              />

              <FieldArray name="inputs">
                {({ remove, push }) => (
                  <div>
                    <h3>Request & Response</h3>
                    {values.inputs.map((_, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom: '1rem',
                          border: '1px solid #eee',
                          padding: '1rem',
                          borderRadius: '4px',
                        }}
                      >
                        <InputField
                          name={`inputs.${index}.req`}
                          label={`Request`}
                          placeholder="Enter request..."
                        />
                        <InputField
                          name={`inputs.${index}.res`}
                          label={`Response`}
                          placeholder="Enter response..."
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          style={{ marginTop: '0.5rem' }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ req: '', res: '' })}
                      style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                      }}
                    >
                      Add Request/Response
                    </button>
                  </div>
                )}
              </FieldArray>

              <Button
                type="submit"
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
                Submit
              </Button>
            </StyledForm>
          </FormContainer>
        );
      }}
    </Formik>
  );
};
