import { useState } from "react";
import { useAuth } from "../../components/AuthUserContext/AuthUserContext";
import { useHistory } from "react-router";
import ErrorMessage from "../../components/ErrorMessage";
import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "../../components/TextField";

const useStyles = makeStyles({
  logInContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imageLogo: {
    width: "200px",
    height: "200px",
    alignSelf: "center",
  },
  formContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxHeight: "600px",
    maxWidth: "400px",
  },
  button: {
    margin: "25px",
  },
  formControl: {
    margin: "10px",
  },
});

export default function LogInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { signInWithEmailAndPassword } = useAuth();
  const history = useHistory();

  const classes = useStyles();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function redirect() {
    history.push("/register");
  }

  return (
    <Container maxWidth="md" className={classes.logInContainer}>
      <img src="images/logo.jpeg" alt="Logo" className={classes.imageLogo} />
      <form onSubmit={onSubmit} className={classes.formContainer}>
        <TextField
          id="email"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          id="password"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button
          color="primary"
          variant="contained"
          type="submit"
          className={classes.button}
        >
          Log In
        </Button>
      </form>
      {error && <ErrorMessage errorMessage={error} />}
      <Typography>No account?</Typography>
      <Button onClick={redirect} variant="outlined" color="primary">
        Create One
      </Button>
    </Container>
  );
}
