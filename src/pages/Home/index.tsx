import { CircularProgress, Container, Typography } from "@material-ui/core";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import { getAllBands } from "../../api/bandAPI";
import BandDetail from "../../components/BandDetail";
import ErrorMessage from "../../components/ErrorMessage";
import { Band } from "../../types";

export default function Home() {
  const {
    isLoading,
    error,
    data = [],
  } = useQuery<Band[], Error>("repoBand", () => {
    return getAllBands();
  });
  const history = useHistory();

  function redirect(id: number) {
    history.push(`/bands/${id}`);
  }

  return (
    <Container>
      <Typography variant="h2">Bands Challenge</Typography>
      <img src="images/logo.jpeg" alt="Ahrens and Asoc" />
      {isLoading && <CircularProgress />}
      {error && <ErrorMessage />}
      {data.map((item) => (
        <BandDetail
          key={item.id}
          id={item.id}
          name={item.name}
          year={item.year}
          genreCode={item.genreCode}
          country={item.country}
          members={item.members}
          onSeeMore={() => redirect(item.id)}
        />
      ))}
    </Container>
  );
}
