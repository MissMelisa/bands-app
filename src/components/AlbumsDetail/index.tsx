import { Paper, Typography } from "@material-ui/core";
import { Album } from "../../types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  albumsDetailsContainer: {
    maxHeight: 300,
    height: "100%",
    minWidth: 350,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  albumName: {
    margin: 15,
  },
});
export default function AlbumsDetails({ name, year }: Album) {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.albumsDetailsContainer}>
      <Typography className={classes.albumName}>{name}</Typography>
      <Typography>{year}</Typography>
    </Paper>
  );
}
