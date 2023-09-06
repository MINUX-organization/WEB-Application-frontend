import { ToastPosition, toast } from 'react-toastify'; 


export const showNotificationSuccess = (successMsg?: string) => { 
  const defaultMessage = "The operation was completed successfully";
  
  toast.success(successMsg || defaultMessage, {
    position: toast.POSITION.BOTTOM_LEFT as ToastPosition,
  });
}; 