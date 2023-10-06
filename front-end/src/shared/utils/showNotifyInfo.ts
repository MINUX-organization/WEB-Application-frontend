import { toast } from "react-toastify";

export const showNotifyInfo = (message: string) => {
    toast.info(message)
}