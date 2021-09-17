import { Button, Container } from "@material-ui/core";
import { useAuth } from "../../pages/AuthUserContext/AuthUserContext";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  containerLogOut: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
export default function SingOut() {
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
