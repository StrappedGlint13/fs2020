import React from "react";
import axios from "axios";
import { Header, Icon } from "semantic-ui-react";

import {  Entry, EntryDetails, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient,  } from "../state";
import { useParams } from "react-router-dom";



const SinglePatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
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

    if (!patient || !patient.ssn) {
      fetchSinglePatient(id);
    }
  })
 

  const GenderIcon = () => {
      if (patient.gender === "male") {
          return <Icon name="mars" />;
      } else if (patient.gender === "female") {
          return <Icon name="venus" />;
      } else {
          return <Icon name="genderless" />;
      }
  };

  const Content: React.FC<{ entries: Entry[]}> = ({entries}) => {
    if(!entries) {
      return <div> No entries </div>
    }

    return (
      <div>
      {entries.map((entry: Entry) => 
        <EntryDetails key={entry.id} entry={entry}  />)}
      </div>
    )
  }

  return (
    <div className="App">
        <Header as='h3'>{patient.name} <GenderIcon /> </Header>
        <p>Ssn: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        <br></br>
        <Header as='h3'> Entries: </Header>
        <br></br>
        <Content entries={patient.entries}  />
    </div>
    
  );
  
  
};



export default SinglePatientPage;