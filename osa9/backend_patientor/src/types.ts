export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female'
}

export enum Type {
    Occupational = 'OccupationalHealthcare',
    Hospital = 'Hospital' 
}

export interface Patient {
    id: any;
    name: string;
    dateOfBirth: number | string;
    ssn: string;
    gender: Gender | string;
    occupation: string;
    entries: Entry[];
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
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


export type NewPatientEntry = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>