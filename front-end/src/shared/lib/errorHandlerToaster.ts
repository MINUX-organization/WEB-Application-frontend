import { toast } from 'react-toastify'; 
import _ from 'lodash'

/** will catch error and shows toast, return void */
export async function errorHandlerToaster(arg: Promise<any>) {
  try {
    await arg
  } catch(e: any) {
    toast.error(e.message ?? JSON.stringify(e), { position: toast.POSITION.BOTTOM_LEFT })
  }
}
