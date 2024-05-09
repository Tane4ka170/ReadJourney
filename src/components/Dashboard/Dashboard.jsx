import Btn from 'components/Btn/Btn';
import DashboardWrapper from 'components/DashboardWrapper/DashboardWrapper';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addNewBook, ownBooks } from 'redux/books/booksOperations';
import { selectOwnBooks } from 'redux/books/booksSelectors';
import * as Yup from 'yup';
import {
  FieldContainer,
  FormContainer,
  Heading,
  InputField,
  Label,
  TitleError,
} from './Dashboard.styled';
import CustomPortalModal from 'components/CustomPortalModal/CustomPortalModal';
import RecommendedBooks from 'components/RecommendedBooks/RecommendedBooks';
import SuccessfulBookAdditionModal from 'components/SuccessfulBookAdditionModal/SuccessfulBookAdditionModal';

const initialValues = {
  title: '',
  author: '',
  page: '',
};

const schema = Yup.object({
  title: Yup.string().required('Required'),
  author: Yup.string().required('Required'),
  page: Yup.string()
    .required('Required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .transform((value, originalValue) => originalValue.replace(/\s/g, '')),
});

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookExists, setBookExists] = useState(false);
  const ownLibrary = useSelector(selectOwnBooks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ownBooks());
  }, [dispatch]);

  const handleSubmit = (e, { resetForm }) => {
    const title = e.title;
    const author = e.author;
    const page = parseInt(e.page);

    if (page) {
      const bookExists = ownLibrary.find(item => item.title === title);

      if (bookExists === undefined) {
        dispatch(addNewBook({ title, author, totalPages: page }));
        setModalOpen(true);
        setBookExists(false);
        resetForm();
      } else {
        setBookExists(true);
        toast.error('The book is already in the library');
      }
    }
    e.target.blur();
  };

  return (
    <DashboardWrapper>
      <div>
        <Heading>Create your library:</Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, resetForm }) => (
            <Form>
              <FormContainer>
                <FieldContainer>
                  <Label htmlFor="title">Book title:</Label>
                  <InputField
                    id="title"
                    name="title"
                    type="title"
                    placeholder="I See You Are..."
                    error={errors.title && touched.title ? 'true' : 'false'}
                    style={bookExists ? { borderColor: 'red' } : {}}
                  />
                  <TitleError name="title" component="div" />
                </FieldContainer>
                <FieldContainer>
                  <Label htmlFor="author">The author:</Label>
                  <InputField
                    id="author"
                    name="author"
                    type="author"
                    placeholder="Hilarion Pavlyuk"
                    paddindleft="95px"
                    error={errors.author && touched.author ? 'true' : 'false'}
                  />
                  <TitleError name="author" component="div" />
                </FieldContainer>
                <FieldContainer>
                  <Label htmlFor="page">Number of pages:</Label>
                  <InputField
                    id="page"
                    name="page"
                    type="page"
                    placeholder="664"
                    paddindleft="135px"
                    error={errors.page && touched.page ? 'true' : 'false'}
                  />
                  <TitleError name="page" component="div" />
                </FieldContainer>
              </FormContainer>
              <Btn label="Add book" />
            </Form>
          )}
        </Formik>
      </div>

      <RecommendedBooks />
      <CustomPortalModal active={modalOpen} setActive={setModalOpen}>
        <SuccessfulBookAdditionModal closeModals={() => setModalOpen()} />
      </CustomPortalModal>
    </DashboardWrapper>
  );
}
