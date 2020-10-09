export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female'
}

export interface Entry {
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

export type NewPatientEntry = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>