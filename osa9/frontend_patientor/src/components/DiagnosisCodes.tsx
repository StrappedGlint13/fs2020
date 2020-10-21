import React, {  } from "react";
import { Header } from "semantic-ui-react";
import { useStateValue } from "../state";


const DiagnosisCodes: React.FC<({ codes: string[] | undefined})> = ({codes}) => {
    const [{diagnosis}] = useStateValue()
    
    const findByCode = (code: string): string | undefined => {
        const diagnose = diagnosis[code].name
        return diagnose
    }

    if (!codes) {
        return null
    }
    return (
        <ul>
        <Header as='h4'> Diagnoses: </Header>{codes.map((item) => 
            <li key={item}>{item} {findByCode(item)} </li>
         )}</ul>
    )
  }  

  export default DiagnosisCodes