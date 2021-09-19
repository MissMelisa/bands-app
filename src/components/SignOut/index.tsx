import { Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth } from "../AuthUserContext";
const useStyles = makeStyles({
  containerLogOut: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
export default function SignOut() {
  const { signOut } = useAuth();

  const classes = useStyles();

  return (
    <Container className={classes.containerLogOut}>
      <Button onClick={signOut} color="primary" variant="outlined">
        Sign out
      </Button>
    </Container>
  );
}
