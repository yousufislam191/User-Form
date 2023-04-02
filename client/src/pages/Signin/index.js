import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      // console.log(values);
      const res = await axios
        .post("http://localhost:5000/api/signin", {
          email: values.email,
          password: values.password,
        })
        .catch((err) => {
          notify(err.response.status, err.response.data.message);
          // console.log(err);
        });
      if (res) {
        notify(res.status, res.data.message);
        navigate("/dashboard");
      }
    },
    validationSchema: userSchema,
  });
  const notify = (status, message) =>
    status === 200
      ? toast.success(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      : toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

  return (
    <div className="root">
      <ToastContainer />
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
