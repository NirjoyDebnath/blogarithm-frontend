import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface ISnackbar {
  message: string;
  time: number;
  afterFinish: () => void;
}

export function SendError({ message, afterFinish }: ISnackbar) {
  // useEffect(() => {
  //   setTimeout(() => {
  //     setOpen(false);
  //   }, time);
  // }, []);

  return (
    <div>
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={afterFinish}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
