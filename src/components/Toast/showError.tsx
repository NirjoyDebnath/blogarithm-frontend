import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useContext } from "react";
import { ErrorSuccessContext } from "../../contexts/errorsuccessContext";

export function ShowError() {
  const { message, setMessage } = useContext(ErrorSuccessContext);

  return (
    <div>
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={() => setMessage(null)}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
