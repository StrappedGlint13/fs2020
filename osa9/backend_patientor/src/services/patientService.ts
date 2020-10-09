import patientsData from '../../data/patients.json'

import { NewPatientEntry, Patient, PublicPatient } from '../types';

const patients: Array<Patient> = patientsData;

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
  console.log(id)
  const entry = patients.find(d => d.id === id);
  console.log(entry)
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
    console.log(Math.max(...patients.map(d => d.id)) + 1)

patients.push(newPatientEntry);
return newPatientEntry;
};
    


export default {
  getEntries,
  getNonSensitivePatientEntries,
  addPatient,
  findById
}