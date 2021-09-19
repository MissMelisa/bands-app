import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { users } from "initFirebase";

import { ErrorMessage, TextField, useAuth } from "components";

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
});

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [passwordOne, setPasswordOne] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const history = useHistory();

  const classes = useStyles();
  const { createUserWithEmailAndPassword } = useAuth();

  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setError("");

    if (passwordOne === passwordTwo) {
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
    } else {
      setError("Password do not match");
    }
  }

  return (
    <Container maxWidth="md" className={classes.logInContainer}>
      <img src="images/logo.jpeg" alt="Logo" className={classes.imageLogo} />
      <form onSubmit={onSubmit} className={classes.formContainer}>
        <TextField
          id="email"
          type="email"
          label="Email"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
          placeholder="Email"
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          value={passwordOne}
          onChange={(event) => setPasswordOne(event.target.value)}
          placeholder="Password"
        />

        <TextField
          id="password"
          label="Confirm password"
          type="password"
          value={passwordTwo}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPasswordTwo(event.target.value)
          }
          placeholder="Confirm password"
        />

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
