import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons(props) {
 const {title,type,disable,color,variant,onClick} = props;
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant={variant || "contained"}
        type={type}
        disabled={disable}
        color={color}
        onClick={onClick}
      >
        {title}
      </Button>
    </Stack>
  );
}