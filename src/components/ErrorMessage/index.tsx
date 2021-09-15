import { Alert, AlertTitle } from "@material-ui/lab";
export default function ErrorMessage() {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      This is an error alert — <strong>check it out!</strong>
    </Alert>
  );
}
