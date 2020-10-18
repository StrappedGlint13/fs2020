export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum Type {
  Occupational = 'OccupationalHealthcare',
  Hospital = 'Hospital' 
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']> | undefined;
}

interface sickLeave {
   startDate: string,
   endDate: string
}

interface discharge {
  date: string,
  criteria: string
}

interface OccupationalHealthCareEntry extends BaseEntry {
   type: Type | string
   employerName: string,
   sickLeave: sickLeave
}

interface HospitalEntry extends BaseEntry {
  type: Type | string
  discharge: discharge
}

export type Entry = OccupationalHealthCareEntry | HospitalEntry