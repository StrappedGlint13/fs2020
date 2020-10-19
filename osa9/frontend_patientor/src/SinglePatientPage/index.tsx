import React from "react";
import axios from "axios";
import { Header, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient,  } from "../state";
import { useParams } from "react-router-dom";

const SinglePatientPage: React.FC = () => {
  const [{ patients, diagnosis }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];


  React.useEffect(() => {
    const fetchSinglePatient = async (id: string) => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatient(patientFromApi));
        } catch (e) {
          console.error(e.response.data);
        }
    };
    console.log('diagnose:', findByCode('Z57.1'))
    if (!patient ||  !patient.ssn) {
      fetchSinglePatient(id);
    }
  })

  const findByCode = (code: string): string | undefined => {
    const diagnose = diagnosis[code].name
    return diagnose
  }


  const GenderIcon = () => {
      if (patient.gender === "male") {
          return <Icon name="mars" />;
      } else if (patient.gender === "female") {
          return <Icon name="venus" />;
      } else {
          return <Icon name="genderless" />;
      }
  };


  return (
    <div className="App">
        <Header as='h3'>{patient.name} <GenderIcon /> </Header>
        <p>Ssn: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        <br></br>
        <b>entries</b>
        <br></br>
        <br></br>
        <p>{patient.entries.map((entry => entry.date + ' ' +
        entry.description))}</p>
        {patient.entries.map((entry) => 
        <ul key={'code'}> {entry.diagnosisCodes?.map((item) => 
           <li key={item}>{item} {findByCode(item)} </li>
        )}</ul>)} 
    </div>
    
  );
  
  
};


export default SinglePatientPage;