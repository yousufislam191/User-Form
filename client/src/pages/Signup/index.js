import React from "react";
import {
  Button,
  Card,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AccountCircle, EmailRounded, LockRounded } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();

  const userSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name is too short. Must be at least 3 characters long")
      .max(50, "Name is too long!"),
    email: Yup.string()
      .required("Email address is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is not secure. Must be at least 8 characters long")
      .matches(/[a-z]+/, "Must have one lowercase character")
      .matches(/[A-Z]+/, "Must have one uppercase character")
      .matches(/[@$!%*#?&]+/, "Must have one special character")
      .matches(/\d+/, "Must have one number"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf(
        [Yup.ref("password"), null],
        "Password & confirm password does not match"
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values, helpers) => {
      // console.log(values.name);
      const res = await axios
        .post("http://localhost:5000/api/signup", {
          name: values.name,
          email: values.email,
          password: values.password,
        })
        .catch((err) => {
          notify(err.response.status, err.response.data.errors.email.msg);
        });
      if (res) {
        notify(res.status, res.data.message);
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
        <Typography className="text-center mb-4" variant="h4" color="primary">
          User Registration
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            required
            className="mb-3"
            name="name"
            type="text"
            variant="outlined"
            label="Name"
            autocomplete="on"
            error={formik.errors.name}
            onChange={formik.handleChange}
            helperText={formik.errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="primary" />
                </InputAdornment>
              ),
            }}
          />
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
            className="mb-3"
            name="password"
            type="text"
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
            }}
          />
          <TextField
            fullWidth
            required
            className="mb-4"
            name="confirmPassword"
            type="text"
            variant="outlined"
            label="Confirm Password"
            error={formik.errors.confirmPassword}
            onChange={formik.handleChange}
            helperText={formik.errors.confirmPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRounded color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <Button fullWidth variant="contained" color="primary" type="submit">
            Sign Up
          </Button>
        </form>
        <div className="text-center">
          <Typography variant="overline">Have an account ?</Typography>
          <Button
            color="primary"
            disableElevation
            onClick={() => {
              navigate("/signin");
            }}
            style={{ backgroundColor: "transparent", textAlign: "left" }}
          >
            Sign in
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
