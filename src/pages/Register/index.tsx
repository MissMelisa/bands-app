import React, { useState } from "react";
import { useAuth } from "../AuthUserContext/AuthUserContext";
import { users } from "../../firebase";
import { useHistory } from "react-router";
import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import ErrorMessage from "../../components/ErrorMessage";

import { makeStyles } from "@material-ui/core/styles";

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

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [passwordOne, setPasswordOne] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const history = useHistory();

  const classes = useStyles();
  const { createUserWithEmailAndPassword } = useAuth();

  const onSubmit = (event: React.SyntheticEvent) => {
    setError("");

    if (passwordOne === passwordTwo)
      createUserWithEmailAndPassword(email, passwordOne)
        .then(({ user }) => {
          if (user !== null) {
            const thisUser = users.child(user.uid);
            const userDetail = thisUser.child("userDetail");
            const dataToInsert = { email: user.email, userId: user.uid };
            userDetail.set(dataToInsert);

            history.push("/login");
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    else setError("Password do not match");
    event.preventDefault();
  };

  return (
    <Container maxWidth="md" className={classes.logInContainer}>
      <img
        src="images/logo.jpeg"
        alt="Ahrens and Asoc"
        className={classes.imageLogo}
      />
      <form onSubmit={onSubmit} className={classes.formContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={passwordOne}
            onChange={(event) => setPasswordOne(event.target.value)}
            placeholder="Password"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={passwordTwo}
            onChange={(event) => setPasswordTwo(event.target.value)}
            placeholder="Password"
          />
        </FormControl>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          className={classes.button}
        >
          Register
        </Button>
      </form>
      {error && <ErrorMessage errorMessage={error} />}
    </Container>
  );
}
