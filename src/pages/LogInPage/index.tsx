import { useState } from "react";
import { useAuth } from "../authUserContext/authUserContext";
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

const useStyles = makeStyles({
  logInContainer: {},
});

export default function LogInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { signInWithEmailAndPassword } = useAuth();
  const history = useHistory();

  const classes = useStyles();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  function redirect() {
    history.push("/register");
  }

  return (
    <Container maxWidth="md" className={classes.logInContainer}>
      <img src="images/logo.jpeg" alt="Ahrens and Asoc" />
      <form onSubmit={onSubmit}>
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        <Button type="submit">Log In</Button>
      </form>
      {error}
      <Typography>No account?</Typography>
      <Button onClick={redirect}> Create One</Button>
    </Container>
  );
}
