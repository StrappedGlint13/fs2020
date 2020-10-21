import React, {  } from "react";
import { Header, Icon, Label, Segment } from "semantic-ui-react";
import {  Entry } from '../types'
import DiagnosisCodes from "./DiagnosisCodes";

const OccupationalComponent: React.FC<{ entry: Entry }> = ({entry}) => {
    return (
        <Segment.Group>
        <Segment>
        <Header as='h3'> {entry.date} <Icon name='user md'>
        </Icon> </Header>
         <Label text={'grey'}>{entry.description}</Label>
         <DiagnosisCodes codes={entry.diagnosisCodes} />
         </Segment>
         </Segment.Group>
    )
  }

export default OccupationalComponent