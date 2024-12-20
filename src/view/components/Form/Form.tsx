import { FieldArray, Formik } from 'formik';
import { FC, useCallback, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useStore } from '../../../data/stores/StoreContext';
import { generateJSONLFile } from '../../../data/utils/generateJSONLFile';
import { InputField } from '../InputField/InputField';
import { Button } from '../UI/Button';
import { ButtonContainer } from '../UI/ButtonContainer';
import { ButtonGroup } from '../UI/ButtonGroup';
import { FormContainer } from '../UI/FormContainer';
import { InputGroup } from '../UI/InputGroup';
import { PairCounter } from '../UI/PairCounter';
import { Section } from '../UI/Section';
import { SectionTitle } from '../UI/SectionTitle';
import { StyledForm } from '../UI/StyledForm';

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

export const Form: FC<{ onChange: (values: FormValues) => void }> = ({
  onChange,
}) => {
  const formikRef = useRef<any>(null);
  const { notificationStore } = useStore();

  useEffect(() => {
    const handleFileDataParsed = (event: CustomEvent) => {
      const parsedData = event.detail;
      if (formikRef.current) {
        formikRef.current.setValues(parsedData);
      }
    };

    window.addEventListener(
      'fileDataParsed',
      handleFileDataParsed as EventListener,
    );

    return () => {
      window.removeEventListener(
        'fileDataParsed',
        handleFileDataParsed as EventListener,
      );
    };
  }, []);

  const initialValues: FormValues = {
    prompt: '',
    inputs: [{ req: '', res: '' }],
  };

  const handleSubmit = useCallback(
    (values: FormValues) => {
      try {
        const jsonlContent = values.inputs.map((input) => ({
          messages: [
            { role: 'system', content: values.prompt },
            { role: 'user', content: input.req },
            { role: 'assistant', content: input.res },
          ],
        }));

        generateJSONLFile(jsonlContent.map((item) => JSON.stringify(item)));
        notificationStore.addNotification(
          'JSONL file generated successfully!',
          'success',
        );
      } catch (error) {
        notificationStore.addNotification(
          'Error generating JSONL file',
          'error',
        );
      }
    },
    [notificationStore],
  );

  return (
    <FormContainer>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          handleSubmit(values);
          setSubmitting(false);
        }}
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
                {({ remove, push }) => (
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
                    <ButtonContainer>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => push({ req: '', res: '' })}
                      >
                        Add Request/Response Pair
                      </Button>
                      <PairCounter>
                        {values.inputs.length} pair
                        {values.inputs.length !== 1 ? 's' : ''}
                      </PairCounter>
                    </ButtonContainer>
                  </Section>
                )}
              </FieldArray>

              <ButtonGroup>
                <Button
                  type="submit"
                  variant="primary"
                  onClick={() => handleSubmit(values)}
                >
                  Generate JSONL File
                </Button>
              </ButtonGroup>
            </StyledForm>
          );
        }}
      </Formik>
    </FormContainer>
  );
};
