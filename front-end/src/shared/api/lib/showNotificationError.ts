import { AxiosError } from 'axios';
import { toast } from 'react-toastify'; 

 export const showNotificationError = (responseError: AxiosError) => { 
  try {
    toast.error(`Error code: (${responseError.response!.status})\nError message:${responseError.response!.statusText}`); 
  } catch {
    toast.error(`No connection to server`); 
  }
 }; 