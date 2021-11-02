/* eslint-disable @typescript-eslint/no-explicit-any */

import { Discharge, NewPatientEntry, Gender, Entry, Type, NewBaseEntry, toHealthCheck, toOccupational, sickLeave, toHospital } from './types';


const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn), 
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
    }
}

const assertNever = (value: NewBaseEntry): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const parseId = (id: any): number => {
  if (!id || !isNumber(id)) {
    throw new Error('Incorrect or missing health_check_rating: ' + id);
  }
  return id;
}

export const toParseEntries = (object: any): NewBaseEntry => {
    const base = {
      id: parseId(object.id),
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    }

    const entryType = parseType(object.type)

    switch(entryType) {
      case "HealthCheck":
        return parseHealthCheck(base, object)
      case "OccupationalHealthcare":
          return parseOccupationalEntry(base, object)
      case "Hospital":
          return parseHospitalEntry(base, object)
      default:
        return assertNever(object)
    }
}

const parseDiagnosisCodes = (object: any[]): string[] => {
  if (!object || !Array.isArray(object)) {
    throw new Error('Incorrect or missing diagnosisCodes: ' + object);
  }
  return object;
}

const parseHealthCheck = (base: NewBaseEntry, object:any): toHealthCheck => {
  return {
    type: "HealthCheck",
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    ...base
  }
}

const parseOccupationalEntry = (base: NewBaseEntry, object:any): toOccupational => {
  return {
    type: "OccupationalHealthcare",
    employerName: parseEmployer(object.employerName),
    sickLeave: parseSickLeaves(object.sickLeave),
    ...base
  }
}

const parseHospitalEntry = (base: NewBaseEntry, object:any): toHospital => {
  console.log(object.discharge.date)
  return {
    type: "Hospital",
    discharge: parseDischarge(object.discharge),
    ...base
  }
}

const parseDischarge = (object:any): Discharge => { 
  return {
    date: parseDate(object.date),
    criteria: parseCriteria(object.criteria)
  }
}

const parseCriteria = (object: any): string => {
  if (!object || !isString(object)) {
    throw new Error('Incorrect or missing criteria: ' + object);
  }
  return object;
}

const parseSickLeaves = (object:any): sickLeave => { 
  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate)
  }
}

const parseEmployer = (desc: any): string => {
  if (!desc || !isString(desc)) {
    throw new Error('Incorrect or missing employer: ' + desc);
  }
  return desc;
}

const parseHealthCheckRating = (healthCheckRating: any): number => {
  if (!healthCheckRating || !isNumber(healthCheckRating)) {
    throw new Error('Incorrect or missing health_check_rating: ' + healthCheckRating);
  }
  return healthCheckRating;
}

const parseSpecialist = (desc: any): string => {
  if (!desc || !isString(desc)) {
    throw new Error('Incorrect or missing specialist: ' + desc);
  }
  return desc;
}

const parseDescription = (desc: any): string => {
  if (!desc || !isString(desc)) {
    throw new Error('Incorrect or missing description: ' + desc);
  }
  return desc;
}

const parseEntries = (object: any[]): Entry[] => {
  return Object.values(object).map((obj: any) => {
    const object = toParseEntries(obj) as Entry
    object.id = obj.id 
    return object;
  })
}

const parseType = (type:any) : string => {
  if (!type || !isType(type)) {
    throw new Error('Missing type: ' + type);
}
return type;
}


const isType = (param: any): param is Type => {
  return Object.values(Type).includes(param);
}


const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
}

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
}

const isGender = (param: any): param is Gender => { 
  return Object.values(Gender).includes(param);
  };
  
  const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Missing gender: ' + gender);
    }
    return gender;
  };


const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect occupation: ' + occupation);
    }
    return occupation;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: any): number is number => {
  return typeof number === 'number' || number instanceof Number;
}

  
export default toNewPatientEntry; parseName; parseDate; parseSsn; parseGender;
   