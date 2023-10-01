// import axios, { AxiosError } from "axios";
// import { showNotificationError } from "./lib";
// import { CpuStatic } from "@/shared/stores/types/cpuStatic";

// export const getCpuData = async () => {
//     const data: CpuStatic = await axios.get("http://localhost:8200/api/static-data/get-cpu-data")
//     .then((response) => response.data)
//     .catch((error: AxiosError) => {
//         showNotificationError(error)
//     })

//     return data;
// }

import * as rt from "runtypes";
import { makeApiFunc } from "./_makeApiFunc";

type Request = {};

const ResponseRuntype = rt.Record({
  cpu: rt.Record({
    uuid: rt.String,
    information: rt.Record({
      manufacturer: rt.String,
      modelName: rt.String,
      architecture: rt.String,
      opModes: rt.String,
      cores: rt.Record({
        cpus: rt.Number,
        threadsPerCore: rt.Number,
        threadsPerSocket: rt.Number,
        sockets: rt.Number,
      }),
      cache: rt.Record({
        L1: rt.Number,
        L2: rt.Number,
        L3: rt.Number
      })
    }),
    clocks: rt.Record({
      maximum: rt.Number,
      minimum: rt.Number,
    })
  })
});

export const getCpuData = makeApiFunc<Request, typeof ResponseRuntype>("GET", "static-data/get-cpu-data", ResponseRuntype);
