import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Register() {
    const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });
  const onSubmit = () => {
    
  }
  return (
    <div className='Register'>
        <h1>Register</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="reg-formContainer">
          <label htmlFor="reg-username">Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="reg-username"
            name="username"
            placeholder="(Ex. JHon-cena)"
          />
          <label htmlFor="reg-password">Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="reg-password"
            name="password"
            type="password"
            placeholder="(Ex. password...)"
          />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Register