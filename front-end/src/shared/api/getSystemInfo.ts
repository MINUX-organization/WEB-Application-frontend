// import axios, { AxiosError } from "axios"; 
// import { SystemInfo } from "@/shared/stores/types/systemInfo";
// import { showNotificationError } from "./lib";

// export const getSystemInfo = async () => { 
// 	const data: SystemInfo = await axios.get("http://localhost:8200/api/static-data/get-system-info-data")
// 	.then((response) => response.data)
// 	.catch((error: AxiosError) => {
// 		showNotificationError(error)
// 	})

// 	return data;
// } 

import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.Record({
	systemInfo: rt.Record({
		motherboard: rt.String,
		cpu: rt.String,
		harddrive: rt.String,
		linux: rt.String,
		technologies: rt.Record({
			versions: rt.Record({
				opencl: rt.String,
				cuda: rt.String
			})
		}),
		drivers: rt.Record({
			versions: rt.Record({
				amd: rt.String,
				nvidia: rt.String
			})
		}),
		minuxVersion: rt.String,
		localIp: rt.String,
		macAddress: rt.String
	})
})

export const getSystemInfo = makeApiFunc<Request, typeof ResponseRuntype>("GET", 'static-data/get-system-info-data', ResponseRuntype)
