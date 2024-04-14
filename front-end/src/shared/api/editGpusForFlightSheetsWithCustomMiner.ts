import * as rt from 'runtypes';
import { makeApiFunc } from './_makeApiFunc';

type Request = {
  flightSheetWithCustomMinerId: number;
};

const ResponseRuntype = rt.String;

export const editGpusForFlightSheetsWithCustomMiner = makeApiFunc<
  Request,
  typeof ResponseRuntype
>(
  'POST',
  'other-data/edit-gpus-for-flight-sheets-with-custom-miner',
  ResponseRuntype
);
