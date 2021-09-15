import { CircularProgress, Container, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useQuery } from "react-query";
import { allBands } from "../../api/bands";
import BandDetail from "../../components/BandDetail/BandDetail";
import { Band } from "../../types";

export default function Home() {
  const {
    isLoading,
    error,
    data = [],
  } = useQuery<Band[], Error>("repoBand", () => {
    return allBands("bands");
  });

  return (
    <Container>
      <Typography>Bands Challenge</Typography>
      {isLoading && <CircularProgress />}
      {error && (
        <Alert>
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>check it out!</strong>
        </Alert>
      )}
      {data.map((item) => (
        <BandDetail
          key={item.id}
          id={item.id}
          name={item.name}
          year={item.year}
          genreCode={item.genreCode}
          country={item.country}
          members={item.members}
        />
      ))}
    </Container>
  );
}
