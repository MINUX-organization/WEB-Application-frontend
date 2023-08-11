/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes'

export const CoinsValue = rt.Record({
    coin: rt.String,
    algorithm: rt.String,
    value: rt.Number
})
export type CoinsValue = rt.Static<typeof CoinsValue>

export const Cryptocurrencies = rt.Record({
    shortName: rt.String,
    fullName: rt.String,
    algorithms: rt.String
})
export type Cryptocurrencies = rt.Static<typeof Cryptocurrencies>

export const Miners = rt.Record({
    shortName: rt.String,
    fullName: rt.String,
    algorithmss: rt.Array(rt.String)
}) 
export type Miners = rt.Static<typeof Miners> 

export const Support = rt.Record({
    coinsValue: rt.Array(CoinsValue),
    cryptocurrencies: rt.Array(Cryptocurrencies),
    miners: rt.Array(Miners)
}) 
export type Support = rt.Static<typeof Support>