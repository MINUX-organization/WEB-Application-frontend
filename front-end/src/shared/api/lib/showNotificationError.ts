import { AxiosError } from 'axios';
import { toast } from 'react-toastify'; 

 export const showNotificationError = (responseError: AxiosError) => { 
     toast.error(
      `Error code: (${responseError.response!.status})\n
        Error message:${responseError.response!.statusText}`, {
       position: toast.POSITION.BOTTOM_LEFT, 
     }); 
 }; 