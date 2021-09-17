import { Alert, AlertTitle } from "@material-ui/lab";

type Props = {
  errorMessage: string;
};

export default function ErrorMessage({ errorMessage }: Props) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      <strong>{errorMessage}</strong>
    </Alert>
  );
}
