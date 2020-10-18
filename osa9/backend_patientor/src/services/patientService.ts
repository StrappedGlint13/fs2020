import patientsData from '../../data/patients'

import { NewPatientEntry, Patient, PublicPatient } from '../types';

const patients: Array<Patient> = patientsData;

console.log(patients)

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatientEntries = (): PublicPatient[] => {
    return patients.map(
        ({ id, name, dateOfBirth, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth, 
        gender,
        occupation,
        entries
    }));
};

const findById = (id: string): Patient | undefined => {  
  const entry = patients.find(d => d.id === id);

  return entry;
}

const generateId = () => {
	return Math.floor(Math.random() * 123456789987654321)
  }

const addPatient = ( entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: generateId(),
        ...entry
    };

patients.push(newPatientEntry);
return newPatientEntry;
};
    


export default {
  getEntries,
  getNonSensitivePatientEntries,
  addPatient,
  findById
}