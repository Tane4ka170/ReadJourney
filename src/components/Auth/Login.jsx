import * as Yup from 'yup';
import sprite from '../../img/sprite.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/auth/authOperations';
import { toast } from 'react-toastify';
import {
  Container,
  ErrorFeedback,
  FeedbackMessage,
  FieldContainer,
  FormBlock,
  FormGroup,
  Icon,
  Label,
  StyledField,
} from './Auth.styled';
import HeaderLogoTitle from 'components/HeaderLogoTitle/HeaderLogoTitle';
import { Formik, Form } from 'formik';
import { FormContainer } from 'components/Dashboard/Dashboard.styled';
import LoginSubmissionBlock from 'components/AuthorizationSubmissionBlock/LoginSubmissionBlock';
import AuthorizationImage from 'components/AuthorizationImage/AuthorizationImage';

const initialValues = {
  email: '',
  password: '',
};

const schema = Yup.object({
  email: Yup.string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email address')
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(7, 'Password must be at least 7 characters'),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleSubmit = async values => {
    try {
      await dispatch(logIn(values)).unwrap();
      navigate('/recommended');
    } catch (error) {
      toast.error('Please verify the email and password');
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
                      error={
                        errors.password && touched.password ? 'true' : 'false'
                      }
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
                      <Icon
                        width={20}
                        height={20}
                        onMouseDown={e => {
                          e.preventDefault();
                          togglePasswordVisibility();
                        }}
                      >
                        <use href={`${sprite}#icon-eye-off`} />
                      </Icon>
                    )}

                    {touched.password && !errors.password && (
                      <FeedbackMessage>Password is secure</FeedbackMessage>
                    )}
                    <ErrorFeedback name="password" component="div" />
                  </FieldContainer>
                </FormGroup>
                <LoginSubmissionBlock />
              </FormContainer>
            </Form>
          )}
        </Formik>
      </FormBlock>

      <AuthorizationImage />
    </Container>
  );
}
