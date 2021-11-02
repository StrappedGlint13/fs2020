export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = "other"
}

export enum Type {
    Occupational = 'OccupationalHealthcare',
    Hospital = 'Hospital' ,
    HealthCheck = 'HealthCheck'
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
    id: any;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
 }

export interface sickLeave {
     startDate: string,
     endDate: string
}

export interface Discharge {
    date: string
    criteria: string
}

export interface HealthCheck extends BaseEntry {
    type: Type | string
    healthCheckRating: number
}

export interface OccupationalHealthCareEntry extends BaseEntry {
     type: Type | string
     employerName: string
     sickLeave?: sickLeave
 }

export interface HospitalEntry extends BaseEntry {
    type: Type | string
    discharge: Discharge
 }

export type Entry = Omit<OccupationalHealthCareEntry | HospitalEntry | HealthCheck | CompinedEntry, 'id'>

export type NewBaseEntry = Omit<BaseEntry, 'id'>
export type toHealthCheck = Omit<HealthCheck, 'id'>
export type toOccupational = Omit<OccupationalHealthCareEntry, 'id'>
export type toHospital = Omit<HospitalEntry, 'id'>
export type CompinedEntry = toHealthCheck | toOccupational | toHospital

export type NewPatientEntry = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>