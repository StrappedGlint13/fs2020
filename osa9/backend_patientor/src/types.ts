export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface Patients {
    id: number | string;
    name: string;
    dateOfBirth: number | string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type NonSensitivePatientEntry = Omit<Patients, 'ssn'>;