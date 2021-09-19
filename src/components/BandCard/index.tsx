import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Band } from "types";

type Props = {
  onSeeMore: () => void;
} & Band;

const useStyles = makeStyles({
  bandDetailContainer: {
    maxHeight: "200px",
    height: "100%",
    maxWidth: "400px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function BandCard({
  name,
  genreCode,
  year,
  country,
  onSeeMore,
}: Props) {
  const classes = useStyles();
  return (
    <Card className={classes.bandDetailContainer}>
      <CardContent>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="h5" color="textSecondary">
          {genreCode}
        </Typography>

        <Typography variant="h5" color="textSecondary">
          {year} - {country}
        </Typography>

        <Button color="primary" onClick={onSeeMore}>
          More info...
        </Button>
      </CardContent>
    </Card>
  );
}
