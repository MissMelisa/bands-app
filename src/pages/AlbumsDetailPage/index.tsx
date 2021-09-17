import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@material-ui/core";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getBandAlbums, getBandById } from "../../api/bandAPI";
import AlbumsDetails from "../../components/AlbumsDetail";
import ErrorMessage from "../../components/ErrorMessage";
import { Album, Band } from "../../types";
import { makeStyles } from "@material-ui/core/styles";
import { queryClient } from "../../App";

const useStyles = makeStyles({
  albumDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  albumList: {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  members: {
    maxHeight: "300px",
    height: "100%",
    minWidth: "350px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
    margin: "5px",
  },
});

export default function AlbumsDetailPage() {
  const { id } = useParams() as any;

  const { data: dataBand } = useQuery<Band, Error>(
    ["repoBand", id],
    () => getBandById(id),
    {
      initialData: () => {
        return queryClient
          .getQueryData<Band[]>("repoBand")
          ?.find((b) => b.id === Number.parseInt(id));
      },
    }
  );

  const {
    isLoading,
    error,
    data = [],
  } = useQuery<Album[], Error>(
    ["repoAlbum", id],
    () => {
      return getBandAlbums(id);
    },
    {
      enabled: !!dataBand,
    }
  );

  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.albumDetailsContainer}>
      <Typography variant="h2">Band's details</Typography>
      {isLoading && <CircularProgress />}
      {error && <ErrorMessage errorMessage={error.message} />}
      <Box className={classes.albumList}>
        <Typography variant="h4">Members</Typography>
        {dataBand?.members.map((item) => (
          <Paper elevation={3} className={classes.members}>
            <Typography>{item}</Typography>
          </Paper>
        ))}
        <Typography variant="h4">Albums</Typography>
        {data.map((item) => (
          <AlbumsDetails
            key={item.bandId}
            name={item.name}
            year={item.year}
            bandId={item.bandId}
          />
        ))}
      </Box>
    </Container>
  );
}
