import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "react-query";
import { useParams } from "react-router";

import { getBandAlbums, getBandById } from "api/bandAPI";
import { ErrorMessage, DetailList } from "components";
import { Album, Band } from "types";
import { queryClient } from "App";

const useStyles = makeStyles({
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

export default function BandDetails() {
  const { id } = useParams() as any;

  const {
    data: dataBand,
    isLoading: isLoadingDataBand,
    error: errorDataBand,
  } = useQuery<Band, Error>(["repoBand", id], () => getBandById(id), {
    initialData: () => {
      return queryClient
        .getQueryData<Band[]>("repoBand")
        ?.find((b) => b.id === Number.parseInt(id));
    },
  });

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

  const errorMessage = error?.message || errorDataBand?.message;
  return (
    <Container maxWidth="lg" className={classes.listContainer}>
      <Typography variant="h2">{dataBand?.name}</Typography>
      {(isLoading || isLoadingDataBand) && <CircularProgress />}
      {errorMessage ? (
        <ErrorMessage errorMessage={errorMessage} />
      ) : (
        <Box className={classes.albumList}>
          <DetailList items={dataBand?.members || []} title="Members" />

          <DetailList items={data.map((item) => item.name)} title="Albums" />
        </Box>
      )}
    </Container>
  );
}
