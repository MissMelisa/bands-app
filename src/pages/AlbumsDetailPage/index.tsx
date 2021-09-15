import { CircularProgress, Container, Typography } from "@material-ui/core";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getBandAlbums } from "../../api/bandAPI";
import AlbumsDetails from "../../components/AlbumsDetail";
import ErrorMessage from "../../components/ErrorMessage";
import { Album } from "../../types";

export default function AlbumsDetailPage() {
  const { id } = useParams() as any;

  const {
    isLoading,
    error,
    data = [],
  } = useQuery<Album[], Error>("repoAlbum", () => {
    return getBandAlbums(id);
  });

  return (
    <Container>
      <Typography variant="h2">Band's albums</Typography>
      {isLoading && <CircularProgress />}
      {error && <ErrorMessage />}
      {data.map((item) => (
        <AlbumsDetails
          key={item.bandId}
          name={item.name}
          year={item.year}
          bandId={item.bandId}
        />
      ))}
    </Container>
  );
}
