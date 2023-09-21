import React from "react";
import TextField from "@mui/material/TextField";
const Input = (props) => {
  const {label,onChange,id,value} = props;
  return (
    <>
      <TextField id={id} label={label} variant="outlined" value={value} onChange={onChange} />
    </>
  );
};

export default Input;
