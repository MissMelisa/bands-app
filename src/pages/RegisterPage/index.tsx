import React, { useState } from "react";
import { useAuth } from "../authUserContext/authUserContext";
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

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [passwordOne, setPasswordOne] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const history = useHistory();

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
    <Container>
      <img src="images/logo.jpeg" alt="Ahrens and Asoc" />
      <form onSubmit={onSubmit}>
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={passwordOne}
            onChange={(event) => setPasswordOne(event.target.value)}
            placeholder="Password"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={passwordTwo}
            onChange={(event) => setPasswordTwo(event.target.value)}
            placeholder="Password"
          />
        </FormControl>
        <Button type="submit">Register</Button>
      </form>
      {error}
    </Container>
  );
}
