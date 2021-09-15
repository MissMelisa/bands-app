import { Paper, Typography } from "@material-ui/core";
import { Album } from "../../types";

export default function AlbumsDetails({ name, year }: Album) {
  return (
    <Paper elevation={3}>
      <Typography>{name}</Typography>
      <Typography>{year}</Typography>
    </Paper>
  );
}
