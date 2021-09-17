import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import { getAllBands } from "../../api/bandAPI";
import BandDetail from "../../components/BandDetail";
import ErrorMessage from "../../components/ErrorMessage";
import SingOut from "../../components/SingOut";
import { Band } from "../../types";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles({
  imageLogo: {
    width: "150px",
    height: "150px",
    alignSelf: "flex-end",
  },
  homeContainer: {
    display: "grid",
    justifyContent: "center",
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
  sortByContainer: {
    margin: "20px",
  },
  controlSelect: {
    minWidth: "150px",
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

  const handleChangeSortBy = (event: any) => {
    setSortByKey(event.target.value);
  };

  function handleOnFilterBy(ev: any) {
    setFilterByKey(ev.target.value);
  }

  const availableGenres = data.reduce<string[]>(function (genres, curr) {
    if (!genres.includes(curr.genreCode)) {
      genres.push(curr.genreCode);
    }
    return genres;
  }, []);

  return (
    <Container maxWidth="lg" className={classes.homeContainer}>
      <Box className={classes.header}>
        <img
          src="images/logo.jpeg"
          alt="Ahrens and Asoc"
          className={classes.imageLogo}
        />
        <SingOut />
      </Box>
      <Typography variant="h2" className={classes.titleHome}>
        Bands Challenge
      </Typography>
      {isLoading && <CircularProgress />}
      {error && <ErrorMessage errorMessage={error.message} />}

      <Box className={classes.sortByContainer}>
        <FormControl className={classes.controlSelect}>
          <InputLabel id="sortBy">Sort By</InputLabel>
          <Select
            labelId="sortBy"
            id="sortBy"
            value={sortByKey}
            onChange={handleChangeSortBy}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="year">Year</MenuItem>
            <MenuItem value="genreCode">Genre</MenuItem>
            <MenuItem value="country">Country</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className={classes.sortByContainer}>
        <FormControl className={classes.controlSelect}>
          <InputLabel id="filterBy">Filter By</InputLabel>
          <Select
            labelId="filterBy"
            id="filterBy"
            value={filterByKey}
            onChange={handleOnFilterBy}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {availableGenres.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Container className={classes.bandsList}>
        {data
          .sort(function (a, b) {
            return sortBy(a, b, sortByKey as keyof Band);
          })
          .filter((item) => !filterByKey || filterByKey === item.genreCode)
          .map((item) => (
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
    </Container>
  );
}
