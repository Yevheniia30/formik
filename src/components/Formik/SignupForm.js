import React from 'react';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
// import s from './SignupForm.module.css';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'textarea' });
  return (
    <div>
      <label htmlFor={props.id || props}>{label}</label>
      <textarea
        className="textarea-input"
        type="textarea"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const SignupForm = () => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        acceptedTerms: false,
        jobType: '',
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .min(2, 'Must be no less 2 and no more 15 characters')
          .max(15, 'Must be no less 2 and no more 15 characters')
          .required('Required'),
        lastName: Yup.string()
          .min(2, 'Must be no less 2 and no more 20 characters')
          .max(20, 'Must be no less 2 and no more 20 characters')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        message: Yup.string()
          .min(5, 'Must be no less 5 and no more 50 characters')
          .max(50, 'Must be no less 5 and no more 50 characters'),
        acceptedTerms: Yup.boolean()
          .required('Required')
          .oneOf([true], 'You must accept the terms'),
        jobType: Yup.string()
          .oneOf(
            ['designer', 'development', 'product', 'other'],
            'Invalid job type',
          )
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className="form">
        <MyTextInput
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Jane"
        />

        <MyTextInput
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Doe"
        />

        <MyTextInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="jane@formik.com"
        />

        <MySelect label="Job Type" name="jobType">
          <option value="">Select a job type</option>
          <option value="designer">Designer</option>
          <option value="development">Developer</option>
          <option value="product">Product Manager</option>
          <option value="other">Other</option>
        </MySelect>

        <MyTextArea
          label="Message"
          name="message"
          type="text"
          rows="6"
          cols="30"
          placeholder="Leave a comment"
        />

        <MyCheckbox name="acceptedTerms">
          I accept the terms and conditions
        </MyCheckbox>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default SignupForm;
