import axios, { AxiosError } from "axios"; 
import { showNotificationError, showNotificationSuccess } from "./lib"; 

export const commandSystemReboot = async () => { 
    await axios.post("http://localhost:8200/commands/reboot", 0)
    .then(() => showNotificationSuccess('The system is rebooting...'))
    .catch((error: AxiosError) => {
        showNotificationError(error ?? "No connection to server")
    }) 
} 