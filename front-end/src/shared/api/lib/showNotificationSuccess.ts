import { toast } from 'react-toastify'; 


export const showNotificationSuccess = (successMsg?: string) => { 
  const defaultMessage = "The operation was completed successfully";
  
  toast.success(successMsg || defaultMessage);
}; 