import axios, { AxiosError } from "axios"; 
import { showNotificationError, showNotificationSuccess } from "./lib"; 

export const commandStartMining = async () => { 
    await axios.post("http://localhost:8200/api/commands/start-mining")
    .then(() => showNotificationSuccess('The mining starting...'))
    .catch((error: AxiosError) => {
        showNotificationError(error ?? "No connection to server")
    }) 
} 