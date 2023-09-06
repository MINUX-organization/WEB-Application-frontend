/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes'

export const CalculationsStatic = rt.Record({
    gpusCount: rt.Number,
    gpusNvidia: rt.Number,
    gpusRadeon: rt.Number
})

export type CalculationsStatic = rt.Static<typeof CalculationsStatic>