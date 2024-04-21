import * as rt from 'runtypes';
import { makeApiFunc } from './_makeApiFunc';

type Request = {
  flightSheetWithCPUId: number;
};

const ResponseRuntype = rt.String;

export const editCpusForFlightSheetsWithCpu = makeApiFunc<
  Request,
  typeof ResponseRuntype
>(
  'POST',
  'other-data/edit-cpus-for-flight-sheets-with-cpu',
  ResponseRuntype
);
