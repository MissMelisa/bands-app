import React from "react";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

type Props = {
  id: string;
  type: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const useStyles = makeStyles({
  formControl: {
    margin: "10px",
  },
});
export default function TextField({
  id,
  type,
  value,
  onChange,
  placeholder,
  label,
}: Props) {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </FormControl>
  );
}
