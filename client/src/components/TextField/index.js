import React from "react";
import { TextField, FormControl } from "@material-ui/core";

const CustomTextField = (props) => {
  return (
    <FormControl className="w-100">
      <TextField
        variant="outlined"
        {...props}
        style={{
          borderColor: props.error ? "red" : "",
        }}
      />
    </FormControl>
  );
};

export default CustomTextField;
