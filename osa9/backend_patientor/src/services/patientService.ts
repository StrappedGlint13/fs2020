import patientsData from '../../data/patients.json'

import { NewPatientEntry, Patients, NonSensitivePatientEntry } from '../types';

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

const findById = (id: number): Patients | undefined => {  
  const entry = patients.find(d => d.id === id);
  return entry;
}

const generateId = () => {
	return Math.floor(Math.random() * 123456789987654321)
  }

const addPatient = ( entry: NewPatientEntry): Patients => {
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