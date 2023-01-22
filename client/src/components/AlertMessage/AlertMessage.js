import { Snackbar } from "@mui/material"
import { forwardRef } from "react";
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertMessage = ({open,setOpen,message,type}) => {

 return  (
   <Snackbar onClose={()=> setOpen(false)}  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={open} autoHideDuration={4000} >
     <Alert onClose={()=> setOpen(false)} severity={type} >{message}</Alert>
   </Snackbar>
 )
}

export default AlertMessage