import React from "react";
import { Button } from "@material-ui/core";

const CustomButtom = (props) => {
  return <Button {...props}>{props.buttonName}</Button>;
};

export default CustomButtom;
