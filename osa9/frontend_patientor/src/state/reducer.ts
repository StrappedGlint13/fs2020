import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS";
    payload: Diagnosis[];
  };

export const setPatientList = ( patients:Patient[]) => {
  return {
    type: 'SET_PATIENT_LIST' as const,
    payload: patients
  } 
}  

export const setDiagnosis = ( diagnosis: Diagnosis[]) => {
  return {
    type: 'SET_DIAGNOSIS' as const,
    payload: diagnosis
  }
}

export const setPatient = ( patient:Patient) => {
  return {
    type: 'SET_PATIENT' as const,
    payload: patient
  }
}

export const addPatient = ( newPatient:Patient) => {
  return {
    type: 'ADD_PATIENT' as const,
    payload: newPatient
  }
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
      case "SET_DIAGNOSIS":
        return {
          ...state,
          diagnosis: {
            ...action.payload.reduce(
              (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
              {}
            ),
            ...state.diagnosis
          }
        };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        },
      };
      
    
    default:
      return state;
  }
};
