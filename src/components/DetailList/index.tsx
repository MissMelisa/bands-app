import { Box, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  detailsContainer: {
    maxHeight: 300,
    height: "100%",
    margin: 15,
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

type Props = {
  items: string[];
  title: string;
};

export default function DetailList({ items, title: listName }: Props) {
  const classes = useStyles();
  return (
    <Box role="listbox" title={listName}>
      <Typography variant="h4">{listName}</Typography>
      {items.map((textItem) => (
        <Paper
          role="listitem"
          key={textItem}
          elevation={3}
          className={classes.detailsContainer}
        >
          <Typography className={classes.albumName}>{textItem}</Typography>
        </Paper>
      ))}
    </Box>
  );
}
