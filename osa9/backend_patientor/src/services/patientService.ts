import patientsData from '../../data/patients.json'

import { Patients, NonSensitivePatientEntry } from '../types';

const patients: Array<Patients> = patientsData;

const getEntries = (): Array<Patients> => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(
        ({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth, 
        gender,
        occupation
    }));
};


export default {
  getEntries,
  getNonSensitivePatientEntries
};