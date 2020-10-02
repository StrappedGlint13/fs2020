export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female'
}

export interface Patients {
    id: any;
    name: string;
    dateOfBirth: number | string;
    ssn: string;
    gender: Gender | string;
    occupation: string;
}

export type NewPatientEntry = Omit<Patients, 'id'>;

export type NonSensitivePatientEntry = Omit<Patients, 'ssn'>;