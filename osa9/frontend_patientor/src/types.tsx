import React from "react";
import HealthComponent from "./components/HealthComponent";
import HospitalComponent from "./components/HospitalComponent";
import OccupationalComponent from "./components/OccupationalComponent";

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
  Hospital = 'Hospital',
  HealthCheck = 'HealthCheck'
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


export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']> | undefined;
}

export interface sickLeave {
   startDate: string,
   endDate: string
}

export interface discharge {
  date: string,
  criteria: string
}

export interface OccupationalHealthCareEntry extends BaseEntry {
   type: Type | string
   employerName: string,
   sickLeave: sickLeave
}

export interface HospitalEntry extends BaseEntry {
  type: Type | string
  discharge: discharge
}

export interface HealthCheck extends BaseEntry {
  type: Type | string
  healthCheckRating: number | undefined
}

export type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheck

export const EntryDetails: React.FC<{ entry: Entry }> = ({entry} ) => {
  switch (entry.type) {
      case "Hospital":
          return <HospitalComponent entry={entry} />
      case "OccupationalHealthcare":
          return <OccupationalComponent entry={entry} />
      case "HealthCheck":
        return <HealthComponent entry={entry} />
      default: 
      return assertNever(entry)
  }
}


const assertNever = (value: Entry): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

