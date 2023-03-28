import React, { useState } from "react";
import {
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";

import "./index.css";
import {
  EmailRounded,
  LockRounded,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const userSchema = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, helpers) => {
      console.log(values);
      try {
        alert("form submitted");
      } catch (error) {
        helpers.setErrors({ submit: error.message });
      }
    },
    validationSchema: userSchema,
  });

  return (
    <div className="root">
      <Card className="form mb-3">
        <Typography className="text-center mb-3" variant="h4" color="primary">
          User Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            required
            className="mb-3"
            name="email"
            type="email"
            variant="outlined"
            label="Email"
            autocomplete="on"
            error={formik.errors.email}
            onChange={formik.handleChange}
            helperText={formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRounded color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            required
            className="mb-2"
            name="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            label="Password"
            error={formik.errors.password}
            onChange={formik.handleChange}
            helperText={formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRounded color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? (
                      <Visibility color="primary" />
                    ) : (
                      <VisibilityOff color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            className="mb-4"
            variant="text"
            color="primary"
            disableElevation
            onClick={() => {
              navigate("/forgot-password");
            }}
            style={{ backgroundColor: "transparent", textAlign: "left" }}
          >
            Forgot Password ?
          </Button>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Sign in
          </Button>
        </form>
        <div className="text-center">
          <Typography variant="overline">Don't have an account ?</Typography>
          <Button
            color="primary"
            disableElevation
            onClick={() => {
              navigate("/signup");
            }}
            style={{ backgroundColor: "transparent", textAlign: "left" }}
          >
            Sign up
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
