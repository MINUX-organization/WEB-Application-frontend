/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes'

export const CalculationsStatic = rt.Record({
    calculations: rt.Record({
        gpusCount: rt.Number,
        gpusNvidia: rt.Number,
        gpusAmd: rt.Number 
    })
})

export type CalculationsStatic = rt.Static<typeof CalculationsStatic>