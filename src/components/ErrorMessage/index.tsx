import { Alert, AlertTitle } from "@material-ui/lab";

type Props = {
  errorMessage: string;
};

export default function ErrorMessage({ errorMessage }: Props) {
  return (
    <Alert severity="error" onClose={() => {}}>
      <AlertTitle>Error</AlertTitle>
      This is an error alert — <strong>{errorMessage}</strong>
    </Alert>
  );
}
