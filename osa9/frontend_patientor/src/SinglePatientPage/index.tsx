import React from "react";
import axios from "axios";
import { Header, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";

const SinglePatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  const [error, setError] = React.useState<string | undefined>();

  console.log(patient);

  React.useEffect(() => {
    const fetchSinglePatient = async (id: string) => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch({ type: "SET_PATIENT", payload: patientFromApi });
        } catch (e) {
          console.error(e.response.data);
          setError(e.response.data.error);
        }
    };
    if (!patient || !patient.ssn) {
      fetchSinglePatient(id);
    }
  }) ;

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
    </div>
  );
};

export default SinglePatientPage;