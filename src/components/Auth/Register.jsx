import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import sprite from '../../img/sprite.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from 'redux/auth/authOperations';
import { toast } from 'react-toastify';

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
    <div>
      <div>
        <LogoTitleBlock />
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <div>
                  <div>
                    <label htmlFor="name">Name:</label>
                    <Field
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
                        <svg width={20} height={20}>
                          <use href={`${sprite}#icon-pajamas_error`} />
                        </svg>
                      ) : (
                        <svg width={20} height={20}>
                          <use href={`${sprite}#icon-check-ok`} />
                        </svg>
                      ))}
                    {touched.name && !errors.name && (
                      <p>Name is secure</p>
                    )}
                    <ErrorMessage name="name" component="div" />
                  </div>

                  <div>
                    <label htmlFor="email">Mail:</label>
                    <Field
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
                        <svg width={20} height={20}>
                          <use href={`${sprite}#icon-pajamas_error`} />
                        </svg>
                      ) : (
                        <svg width={20} height={20}>
                          <use href={`${sprite}#icon-check-ok`} />
                        </svg>
                      ))}
                    {touched.email && !errors.email && (
                      <p>Email is secure</p>
                    )}
                    <ErrorMessage name="email" component="div" />
                  </div>

                  <div>
                    <label htmlFor="password">
                      Password:
                    </label>
                    <Field
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
                      <svg width={20} height={20}>
                        <use href={`${sprite}#icon-pajamas_error`} />
                      </svg>
                    ) : !errors.password && touched.password ? (
                      <svg width={20} height={20}>
                        <use href={`${sprite}#icon-check-ok`} />
                      </svg>
                    ) : showPassword ? (
                      <svg
                        width={20}
                        height={20}
                        onMouseDown={e => {
                          e.preventDefault();
                          togglePasswordVisibility();
                        }}
                      >
                        <use href={`${sprite}#icon-eye`} />
                      </svg>
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
                      <p>Password is secure</p>
                    )}
                    <ErrorMessage name="password" component="div" />
                  </div>
                </div>

                <SubmitBlockRegister />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ImgAutorization />
    </в>
  );
}
