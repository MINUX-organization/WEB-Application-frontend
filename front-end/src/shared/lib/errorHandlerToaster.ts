import { toast } from 'react-toastify'; 
import _ from 'lodash'

/** will catch error and shows toast, return void */
export async function errorHandlerToaster<T>(arg: Promise<T>) {
  try {
    return await arg
  } catch(e: any) {
    toast.error(e.message ?? JSON.stringify(e))
  }
}
