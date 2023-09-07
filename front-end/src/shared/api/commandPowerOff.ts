import axios, { AxiosError } from "axios"; 
import { showNotificationError, showNotificationSuccess } from "./lib"; 

export const commandPowerOff = async () => { 
    await axios.post("http://localhost:8000/commands/power-off", {})
    .then(() => showNotificationSuccess('The system has been shut down successfully!'))
    .catch((error: AxiosError) => {
        showNotificationError(error)
    }) 
} 