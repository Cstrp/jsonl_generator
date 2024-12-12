import emotionStyled from '@emotion/styled';
import { Form as FormikForm } from 'formik';

export const StyledForm = emotionStyled(FormikForm)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
