import { Card, CardContent, Typography } from "@material-ui/core";
import { Band } from "../../types";

export default function BandDetail({
  name,
  genreCode,
  year,
  country,
  members,
}: Band) {
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
      </CardContent>
    </Card>
  );
}
