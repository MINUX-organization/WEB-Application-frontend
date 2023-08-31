import { toast } from 'react-toastify'; 

interface IResponse {
   status: number;
   statusText: string;
 }
 
 export const showNotification = (response: IResponse, successMsg: string) => {
   if (response.status >= 200 && response.status < 300) {
     toast.success(successMsg, {
       position: toast.POSITION.BOTTOM_LEFT, 
     });
   } else {
     toast.error(`Error code: (${response.status})\nError message:${response.statusText}`, {
       position: toast.POSITION.BOTTOM_LEFT, 
     });
   } 
 }; 