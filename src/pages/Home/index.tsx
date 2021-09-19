import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { useQuery } from "react-query";
import { useHistory } from "react-router";

import { getAllBands } from "api/bandAPI";
import { BandCard, ErrorMessage, SignOut, DropDown } from "components";
import { Band } from "types";

const useStyles = makeStyles({
  imageLogo: {
    width: "150px",
    height: "150px",
    alignSelf: "flex-end",
  },

  bandsList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(400px, 1fr))",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  titleHome: {
    fontWeight: "bold",
    marginBottom: "20px",
  },
});

function sortBy<TEntity>(
  a: TEntity,
  b: TEntity,
  sortKey: keyof TEntity
): number {
  const aValue = a[sortKey];
  const bValue = b[sortKey];
  if (aValue < bValue) {
    return -1;
  }
  if (aValue > bValue) {
    return 1;
  }
  return 0;
}

export default function Home() {
  const [sortByKey, setSortByKey] = useState<string>("");
  const [filterByKey, setFilterByKey] = useState<string>("");

  const {
    isLoading,
    error,
    data = [],
  } = useQuery<Band[], Error>("repoBand", () => {
    return getAllBands();
  });

  const history = useHistory();

  const classes = useStyles();

  function redirect(id: number) {
    history.push(`/bands/${id}`);
  }

  const availableGenres = data.reduce<string[]>(function (genres, curr) {
    if (!genres.includes(curr.genreCode)) {
      genres.push(curr.genreCode);
    }
    return genres;
  }, []);

  return (
    <Container maxWidth="md">
      <Box className={classes.header}>
        <img src="images/logo.jpeg" alt="logo" className={classes.imageLogo} />
        <SignOut />
      </Box>
      <Typography variant="h2" className={classes.titleHome}>
        Bands Challenge
      </Typography>
      {isLoading && <CircularProgress />}
      {error && <ErrorMessage errorMessage={error.message} />}

      <DropDown
        id="sortBy"
        label="Sort by"
        options={["name", "year", "genreCode", "country"]}
        value={sortByKey}
        onChange={setSortByKey}
      />
      <DropDown
        options={availableGenres}
        label="Filter by"
        id="filterBy"
        value={filterByKey}
        onChange={setFilterByKey}
      />

      <Container className={classes.bandsList}>
        {data
          .sort(function (a, b) {
            return sortBy(a, b, sortByKey as keyof Band);
          })
          .filter((item) => !filterByKey || filterByKey === item.genreCode)
          .map((item) => (
            <BandCard
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
    </Container>
  );
}
