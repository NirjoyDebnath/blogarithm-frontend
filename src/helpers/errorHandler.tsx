import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface ISnackbar{
  message: string;
}

export default function SendError({message}:ISnackbar) {
  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
