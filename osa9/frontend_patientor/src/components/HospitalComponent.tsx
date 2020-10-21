import React, {  } from "react";
import DiagnosisCodes from './DiagnosisCodes'
import {  Entry } from '../types'
import { Header, Icon, Label, Segment } from "semantic-ui-react";


const HospitalComponent: React.FC<{ entry: Entry }> = ({entry }) => {
    return (
      <Segment.Group>
        <Segment>
       <Header as='h3'> {entry.date} <Icon name='stethoscope'>
        </Icon>  </Header>
      <Label text={'grey'}>{entry.description}</Label>
        <DiagnosisCodes codes={entry.diagnosisCodes} />
        </Segment>
        </Segment.Group>
    )
  }

export default HospitalComponent