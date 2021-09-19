import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  dropDownContainer: {
    margin: 20,
  },
  controlSelect: {
    minWidth: 150,
  },
});

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
  id: string;
};

export default function DropDown({
  value,
  onChange,
  options,
  id,
  label,
}: Props) {
  const classes = useStyles();
  return (
    <Box className={classes.dropDownContainer}>
      <FormControl className={classes.controlSelect}>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={id}
          value={value}
          onChange={(ev) => onChange(ev.target.value as string)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
