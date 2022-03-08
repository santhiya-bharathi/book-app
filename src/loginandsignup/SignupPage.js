import * as React from 'react';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { API_URL } from '../App';

export function SignupPage() {
  const history = useHistory();
  const formvalidationschema = yup.object({
    email: yup.string().min(5, "need a bigger email").required(),
    password: yup.string().min(5).max(12).required(),
  });

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: formvalidationschema,

    onSubmit: (newSignup) => {
      console.log("onsubmit", newSignup);
      addData(newSignup);
    }
  });
  const addData = (newSignup) => {
    console.log(newSignup);
    fetch(`${API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(newSignup),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      if (response.status === 400) {
        alert('Invalid credentials');
        history.push("/signup");
      } else {
        alert('signup Successful');
        history.push("/");
      }
    });
  };
  return (
    <section className='login-page-background'>
      <form className="login-page" onSubmit={handleSubmit}>
        <div className="login-page">
          <p className="login-head">sign up</p>
          <p className="please">Please enter your e-mail id and Password</p>
          <TextField
            variant="outlined"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            error={errors.email && touched.email}
            helperText={errors.email && touched.email && errors.email}
            placeholder="Enter your Email" />

          <TextField
            variant="outlined"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            autoComplete="current-password"
            error={errors.password && touched.password}
            helperText={errors.password && touched.password && errors.password}
            placeholder="Enter your Password" />
          <Button variant="contained" type="submit">sign up</Button>
         <div className='signup-link'>
          <p className="please">Already Registered ?</p>
          <p onClick={() => history.push("/")} className="signup-word">Click here to login</p>
        </div>
        </div>
      </form>
    </section>
  );
}
export function SignupFailed() {
  return (
    <div>
      <img className="failed" src="https://icon-library.com/images/red-cross-icon-png/red-cross-icon-png-27.jpg" alt="signup failed" />
      <h2>email already exists or password must be longer</h2>
    </div>
  );
}
