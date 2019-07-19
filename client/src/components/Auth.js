import React, { useState } from "react";

import axios from "axios";

import { useAuthToken } from "../hooks";

import { Formik, Form, Field, ErrorMessage } from "formik";

const Auth = props => {
  const [token, setToken] = useAuthToken();
  const [loginError, setLoginError] = useState('');
  const [signup, setSignup] = useState(true);

  if (token !== null) {
    props.history.push("/");
  }

  return (
    <Formik
      initialValues={{ username: "", password: "", confirm_password: ""}}
      validate={values => {
        let errors = {};
        if (!values.username) {
          errors.username = "Required";
        }
        if(!values.password) {
          errors.password = 'Required';
        }
        if (values.password !== values.confirm_password){
          errors.confirm_password = 'Passwords do not match!';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log('submit!')
        axios
          .post("http://localhost:3333/api/register", values)
          .then(res => {
            console.log(res.data);

            if (!res.data.error) {
              setToken(res.data.token);
            } else {
              setLoginError(res.data.message);
            }

            setSubmitting(false);
          })
          .catch(err => {
            console.log(err);
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form className='form'>
          <Field
            disabled={isSubmitting}
            type="username"
            name="username"
            placeholder="Username"
          />
          <ErrorMessage name="username" component="div" />
          <Field
            disabled={isSubmitting}
            type="password"
            name="password"
            placeholder="Password"
          />
          <ErrorMessage name="password" component="div" />
          {
            signup &&
          <Field
            disabled={isSubmitting}
            type='password'
            name='confirm_password'
            placeholder='Confirm password'
          />
          }
          <ErrorMessage name="confirm_password" component="div" />
          {
            loginError && <p>{loginError}</p>
          }
          <button disabled={isSubmitting} type="submit">
            {
              signup ? 'Sign up' : 'Log in'
            }
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Auth;
