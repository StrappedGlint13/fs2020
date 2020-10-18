/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientEntry, Gender, Entry, Type } from './types';

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

const toParseEntries = (object: any): Entry => {
  return {
    ...object,
    type: parseType(object.type)
   }
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
      throw new Error('Incorrect or occupation: ' + occupation);
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

  
export default toNewPatientEntry; parseName; parseDate; parseSsn; parseGender;
   