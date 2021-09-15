import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { Band } from "../../types";

type Props = {
  onSeeMore: () => void;
} & Band;

export default function BandDetail({
  name,
  genreCode,
  year,
  country,
  members,
  onSeeMore,
}: Props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="h5" color="textSecondary">
          {genreCode}
        </Typography>
        <Typography variant="h5" color="textSecondary">
          {year}
        </Typography>
        <Typography variant="h5" color="textSecondary">
          {country}
        </Typography>
        <Typography variant="h4" color="textSecondary">
          {members}
        </Typography>

        <Button color="primary" onClick={onSeeMore}>
          More info...
        </Button>
      </CardContent>
    </Card>
  );
}
