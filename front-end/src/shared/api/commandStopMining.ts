import axios, { AxiosError } from "axios"; 
import { showNotificationError, showNotificationSuccess } from "./lib"; 

export const commandStopMining = async () => { 
    await axios.post("http://localhost:8200/api/commands/stop-mining")
    .then(() => showNotificationSuccess('The mining stopping...'))
    .catch((error: AxiosError) => {
        showNotificationError(error ?? "No connection to server")
    }) 
} 