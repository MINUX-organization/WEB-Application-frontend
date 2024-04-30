import * as rt from "runtypes";
import { makeApiFunc } from "./_makeApiFunc";

type Request = {};

const ResponseRuntype = rt.Record({
  flightSheets: rt.Array(
    rt.Union(
      rt.Record({
        type: rt.Literal("GPU-SINGLE"),
        id: rt.Number,
        name: rt.String,
        additionalString: rt.String,
        cryptocurrency: rt.Record({
          id: rt.Number,
          name: rt.String,
          fullName: rt.String,
          algorithmId: rt.Number,
        }),
        wallet: rt.Record({
          id: rt.Number,
          name: rt.String,
          source: rt.String,
          address: rt.String,
          cryptocurrencyId: rt.Number,
        }),
        miner: rt.Record({
          id: rt.Number,
          name: rt.String,
          fullName: rt.String,
        }),
        pool: rt.Record({
          id: rt.Number,
          host: rt.String,
          port: rt.Number,
          cryptocurrencyId: rt.Number,
        }),
        algorithm: rt.Record({
          id: rt.Number,
          name: rt.String,
        }),
      }),
      rt.Record({
        type: rt.Literal("GPU-MULTIPLE"),
        id: rt.Number,
        name: rt.String,
        additionalString: rt.String,
        configs: rt.Array(
          rt.Record({
            cryptocurrency: rt.Record({
              id: rt.Number,
              name: rt.String,
              fullName: rt.String,
              algorithmId: rt.Number,
            }),
            wallet: rt.Record({
              id: rt.Number,
              name: rt.String,
              source: rt.String,
              address: rt.String,
              cryptocurrencyId: rt.Number,
            }),
            pool: rt.Record({
              id: rt.Number,
              host: rt.String,
              port: rt.Number,
              cryptocurrencyId: rt.Number,
            }),
            algorithm: rt.Record({
              id: rt.Number,
              name: rt.String,
            }),
          })
        ),
        miner: rt.Record({
          id: rt.Number,
          name: rt.String,
          fullName: rt.String,
        }),
      }),
      rt.Record({
        type: rt.Literal("CUSTOM"),
        id: rt.Number,
        name: rt.String,
        installationURL: rt.String,
        wallet: rt.String,
        poolURL: rt.String,
        coin: rt.String,
        algorithm: rt.String,
        poolTemplate: rt.String,
        walletAndWorkerTemplate: rt.String,
        extraConfigArguments: rt.String,
        password: rt.String,
      }),
      rt.Record({
        type: rt.Literal("CPU"),
        id: rt.Number,
        name: rt.String,
        additionalString: rt.String.optional(),
        configFile: rt.String.optional(),
        hugePages: rt.Number,
        cryptocurrency: rt.Record({
          id: rt.Number,
          name: rt.String,
          fullName: rt.String,
          algorithmId: rt.Number,
        }),
        wallet: rt.Record({
          id: rt.Number,
          name: rt.String,
          source: rt.String,
          address: rt.String,
          cryptocurrencyId: rt.Number,
        }),
        miner: rt.Record({
          id: rt.Number,
          name: rt.String,
          fullName: rt.String,
        }),
        pool: rt.Record({
          id: rt.Number,
          host: rt.String,
          port: rt.Number,
          cryptocurrencyId: rt.Number,
        }),
        algorithm: rt.Record({
          id: rt.Number,
          name: rt.String,
        }),
      }),
    )
  ),
});

export type TFullFilledFlightSheet = rt.Static<typeof ResponseRuntype>['flightSheets'][number]

export const getFullFilledFlightSheets = makeApiFunc<
  Request,
  typeof ResponseRuntype
>("GET", "other-data/get-full-filled-flight-sheets", ResponseRuntype);

// testing
// export const getFullFilledFlightSheets = (arg: Request): Promise<{ data: { flightSheets: TFullFilledFlightSheet[] } }> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const items: TFullFilledFlightSheet[] = [
//         {
//           type: 'normal',
//           additionalString: '-feag',
//           algorithm: {
//             id: 32,
//             name: 'SHA256'
//           },
//           cryptocurrency: {
//             id: 10,
//             algorithmId: 3,
//             fullName: 'BITCOIN',
//             name: "BTC"
//           },
//           id: 1,
//           miner: {
//             fullName: "COOL MINER",
//             id: 53,
//             name: "CLMINER"
//           },
//           name: "feag --- normal FLIGHT sheet",
//           pool: {
//             cryptocurrencyId: 12,
//             host: "localhost:4342",
//             id: 123,
//             port: 34555
//           },
//           wallet: {
//             address: '0xfeafef32fef',
//             cryptocurrencyId: 12,
//             id: 33,
//             name: "Fine Wallet",
//             source: "feoag"
//           }
//         },
//         {
//           type: 'custom',
//           algorithm: 'feg',
//           coin: 'feag',
//           extraConfigArguments: '0f-f-f-ge-a',
//           id: 3,
//           installationURI: 'https://feagl.com',
//           name: 'Nice Custom FLIGHT Sheet',
//           poolTemplate: 'fjgjejg template',
//           pool: 'sisisisis',
//           wallet: 'ahaha',
//           walletAndWorkerTemplate: 'feaga'
//         }
//       ]
//       resolve({ data: { flightSheets: items } })
//     }, 2000)
//   })
// }