import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import sprite from '../../img/sprite.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/auth/authOperations';
import { toast } from 'react-toastify';
import {
  Container,
  ErrorFeedback,
  FeedbackMessage,
  FieldContainer,
  FormBlock,
  FormContainer,
  FormGroup,
  Icon,
  Label,
  StyledField,
} from './Auth.styled';
import RegistrationSubmissionBlock from 'components/AuthorizationSubmissionBlock/RegistrationSubmissionBlock';
import AuthorizationImage from 'components/AuthorizationImage/AuthorizationImage';
import HeaderLogoTitle from 'components/HeaderLogoTitle/HeaderLogoTitle';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const schema = Yup.object({
  name: Yup.string()
    .required('Required')
    .min(2, 'The name must have at least 2 letters'),
  email: Yup.string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email address')
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(7, 'Password must be at least 7 characters'),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleSubmit = async values => {
    try {
      await dispatch(register(values)).unwrap();
      navigate('/recommended');
    } catch (error) {
      if (error === 'Request failed with status code 409') {
        toast.error('A user with this email address already exists');
      } else {
        toast.error('Registration was unsuccessful. Please try again later.');
      }
    }
  };

  return (
    <Container>
      <FormBlock>
        <HeaderLogoTitle />
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <FormContainer>
                <FormGroup>
                  <FieldContainer>
                    <Label htmlFor="name">Name:</Label>
                    <StyledField
                      id="name"
                      name="name"
                      type="name"
                      placeholder="Nik Ovson"
                      error={errors.name && touched.name ? 'true' : 'false'}
                      paddingleft="65px"
                      style={{
                        borderColor:
                          touched.name && errors.name
                            ? 'red'
                            : touched.name && !errors.name
                            ? 'green'
                            : 'defaultColor',
                      }}
                    />
                    {touched.name &&
                      (errors.name ? (
                        <Icon width={20} height={20}>
                          <use href={`${sprite}#icon-pajamas_error`} />
                        </Icon>
                      ) : (
                        <Icon width={20} height={20}>
                          <use href={`${sprite}#icon-check-ok`} />
                        </Icon>
                      ))}
                    {touched.name && !errors.name && (
                      <FeedbackMessage>Name is secure</FeedbackMessage>
                    )}
                    <ErrorFeedback name="name" component="div" />
                  </FieldContainer>

                  <FieldContainer>
                    <Label htmlFor="email">Mail:</Label>
                    <StyledField
                      id="email"
                      name="email"
                      type="email"
                      placeholder="nik@google.com"
                      error={errors.email && touched.email ? 'true' : 'false'}
                      paddingleft="53px"
                      style={{
                        borderColor:
                          touched.email && errors.email
                            ? 'red'
                            : touched.email && !errors.email
                            ? 'green'
                            : 'defaultColor',
                      }}
                    />
                    {touched.email &&
                      (errors.email ? (
                        <Icon width={20} height={20}>
                          <use href={`${sprite}#icon-pajamas_error`} />
                        </Icon>
                      ) : (
                        <Icon width={20} height={20}>
                          <use href={`${sprite}#icon-check-ok`} />
                        </Icon>
                      ))}
                    {touched.email && !errors.email && (
                      <FeedbackMessage>Email is secure</FeedbackMessage>
                    )}
                    <ErrorFeedback name="email" component="div" />
                  </FieldContainer>

                  <FieldContainer>
                    <Label htmlFor="password">Password:</Label>
                    <StyledField
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="********"
                      paddingleft="86px"
                      style={{
                        borderColor:
                          touched.password && errors.password
                            ? 'red'
                            : touched.password && !errors.password
                            ? 'green'
                            : 'defaultColor',
                      }}
                    />

                    {errors.password && touched.password ? (
                      <Icon width={20} height={20}>
                        <use href={`${sprite}#icon-pajamas_error`} />
                      </Icon>
                    ) : !errors.password && touched.password ? (
                      <Icon width={20} height={20}>
                        <use href={`${sprite}#icon-check-ok`} />
                      </Icon>
                    ) : showPassword ? (
                      <Icon
                        width={20}
                        height={20}
                        onMouseDown={e => {
                          e.preventDefault();
                          togglePasswordVisibility();
                        }}
                      >
                        <use href={`${sprite}#icon-eye`} />
                      </Icon>
                    ) : (
                      <svg
                        width={20}
                        height={20}
                        onMouseDown={e => {
                          e.preventDefault();
                          togglePasswordVisibility();
                        }}
                      >
                        <use href={`${sprite}#icon-eye-off`} />
                      </svg>
                    )}

                    {touched.password && !errors.password && (
                      <FeedbackMessage>Password is secure</FeedbackMessage>
                    )}
                    <ErrorFeedback name="password" component="div" />
                  </FieldContainer>
                </FormGroup>

                <RegistrationSubmissionBlock />
              </FormContainer>
            </Form>
          )}
        </Formik>
      </FormBlock>
      <AuthorizationImage />
    </Container>
  );
}
