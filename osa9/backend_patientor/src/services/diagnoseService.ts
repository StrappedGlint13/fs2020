import diagnoseData from '../../data/diagnoses.json'

import { DiagnoseEntry } from '../types';

const diagnoses: Array<DiagnoseEntry> = diagnoseData;

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

export const findByCode = (code: string): DiagnoseEntry | undefined => {
  const diagnose = diagnoses.find(d => d.code === code)
  return diagnose
}

export default {
  getEntries,
};