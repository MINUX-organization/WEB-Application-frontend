// import axios, { AxiosError } from "axios"; 
// import { showNotificationError } from "./lib";
// import { HarddriveStatic } from "@/shared/stores/types/HarddriveStatic";

// export const getHarddriveData = async () => { 
//   const data: HarddriveStatic = await axios.get("http://localhost:8200/api/static-data/get-harddrives-data")
//   .then((response) => response.data)
//   .catch((error: AxiosError) => {
//     showNotificationError(error)
//   })

//   return data;
// }

import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.Record({
  harddrives: rt.Array(rt.Record({
    information: rt.Record({
      capacity: rt.Number,
      deviceModel: rt.Union(rt.String, rt.Null),
      sataPorts: rt.Union(rt.String, rt.Null),
      serialNumber: rt.Union(rt.String, rt.Null)
    }),
    uuid: rt.String
  }))
})

export const getStaticHarddrives = makeApiFunc<Request, typeof ResponseRuntype>("GET", 'static-data/get-harddrives-data', ResponseRuntype)
