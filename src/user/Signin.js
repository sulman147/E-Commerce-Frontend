import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectTorefferer: false
  });
  const { email, password, loading, error, redirectTorefferer } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectTorefferer: true
          });
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        {/* <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        /> */}
        <TextField
          fullWidth
          id="outlined-search"
          onChange={handleChange("email")}
          value={email}
          label="Email"
          type="email"
          variant="outlined"
        />
      </div>
      <div className="form-group">
        {/* <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        /> */}

        <TextField
          fullWidth
          id="outlined-search"
          onChange={handleChange("password")}
          value={password}
          label="Password"
          type="password"
          variant="outlined"
        />
      </div>
      <Button onClick={clickSubmit} variant="contained" color="primary">
        Submit
      </Button>
      {/* <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button> */}
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );
  const redirectUser = () => {
    if (redirectTorefferer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  return (
    <Layout
      title="Sign In"
      description="Signin to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
