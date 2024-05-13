import Btn from 'components/Btn/Btn';
import DashboardWrapper from 'components/DashboardWrapper/DashboardWrapper';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchBooks } from 'redux/books/booksOperations';
import * as Yup from 'yup';
import {
  StyledButtonContainer,
  StyledFiltersTitle,
  StyledFormContainer,
} from './RecommendedDashboard.styled';
import {
  FieldContainer,
  FormContainer,
  InputField,
  Label,
} from 'components/Dashboard/Dashboard.styled';
import StartWorkout from 'components/StartWorkout/StartWorkout';

const initialValues = {
  title: '',
  author: '',
};

const schema = Yup.object({
  title: Yup.string(),
  author: Yup.string(),
});

export default function RecomendedDashboard() {
  const [isRestButtonVisible, setIsRestButtonVisible] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    const { title, author } = e;
    if (title === undefined) return;
    if (title) {
      setIsRestButtonVisible(true);
      dispatch(fetchBooks({ title, author }));
    } else {
      toast.warn('Kindly complete the form');
    }
    e.target.blur();
  };

  const handleReset = resetForm => {
    setIsRestButtonVisible(false);
    resetForm();
    dispatch(fetchBooks({ page: 1, limit: 10 }));
  };

  return (
    <DashboardWrapper>
      <StyledFormContainer>
        <StyledFiltersTitle>Filters:</StyledFiltersTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ resetForm }) => (
            <Form>
              <FormContainer>
                <FieldContainer>
                  <Label htmlFor="title">Book title:</Label>
                  <InputField
                    id="title"
                    name="title"
                    type="title"
                    placeholder="Enter text"
                  />
                </FieldContainer>
                <FieldContainer>
                  <Label htmlFor="author">The author:</Label>
                  <InputField
                    id="author"
                    name="author"
                    type="author"
                    placeholder="Enter text"
                    paddindleft="95px"
                  />
                </FieldContainer>
              </FormContainer>
              <StyledButtonContainer>
                <Btn label="To apply" onClick={handleSubmit} />
                {isRestButtonVisible && (
                  <Btn label="Rest" onClick={() => handleReset(resetForm)} />
                )}
              </StyledButtonContainer>
            </Form>
          )}
        </Formik>
      </StyledFormContainer>

      <StartWorkout />
      {/* <Quote /> */}
    </DashboardWrapper>
  );
}
