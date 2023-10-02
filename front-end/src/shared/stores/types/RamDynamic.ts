/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes'

export const Value = rt.Record({
	value: rt.Number,
	measurement: rt.String
});
export type Value = rt.Static<typeof Value>;

export const RamDynamic = rt.Record({
	uuid: rt.String, 
	free: rt.Record({
		value: rt.Number,
		measurement: rt.String
	}),
	usage: rt.Record({
		value: rt.Number,
		measurement: rt.String
	})
})
export type RamDynamic = rt.Static<typeof RamDynamic>;