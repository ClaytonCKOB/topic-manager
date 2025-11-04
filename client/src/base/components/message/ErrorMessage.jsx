import { Alert, Snackbar } from "@mui/material";

export default function ErrorMessage({open, severity, message, snackbar, setSnackbar}) {
    const handleCloseSnackbar = (_, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };
    
    return <>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={severity} 
            variant="filled" 
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
    </>;
}