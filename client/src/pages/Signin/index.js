import React, { useState } from "react";
import { Card, InputAdornment, Typography } from "@material-ui/core";

import "./index.css";
import CustomButtom from "../../components/Button";
import CustomTextField from "../../components/TextField";
import { EmailRounded, LockRounded, Visibility } from "@material-ui/icons";

const SignIn = () => {
  const handleClick = () => {
    console.log("Button clicked");
  };

  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value);
    if (event.target.value.length < 5) {
      setError(true);
      setHelperText("Value must be at least 5 characters");
    } else {
      setError(false);
      setHelperText("");
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="root">
      <Card className="form mb-3">
        <Typography className="text-center" variant="h4" color="primary">
          User Login
        </Typography>
        <form className="mt-3" onSubmit={handleFormSubmit}>
          <CustomTextField
            label="Email"
            error={error}
            helperText={helperText}
            onChange={handleChange}
            value={value}
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRounded color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <br />
          <br />
          <CustomTextField
            label="Password"
            error={error}
            helperText={helperText}
            onChange={handleChange}
            value={value}
            type="password"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRounded color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Visibility color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <br />
          <CustomButtom
            buttonName="Forgot Password ?"
            variant="text"
            color="primary"
            disableElevation
            onClick={handleClick}
            style={{ backgroundColor: "transparent", textAlign: "left" }}
          />
          <br />
          <div className="text-center">
            <CustomButtom
              buttonName="sign in"
              variant="contained"
              color="primary"
              onClick={handleClick}
            />
            <br />
            <Typography variant="overline">Don't have an account ?</Typography>
            <CustomButtom
              buttonName="Signup"
              color="primary"
              disableElevation
              onClick={handleClick}
              style={{ backgroundColor: "transparent", textAlign: "left" }}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
