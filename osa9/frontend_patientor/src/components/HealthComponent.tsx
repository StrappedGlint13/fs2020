import React, {  } from "react";
import { Header, Icon, Label, Segment } from "semantic-ui-react";
import { Entry, HealthCheck } from '../types'
import DiagnosisCodes from "./DiagnosisCodes";

const isHealth = (value: Entry): value is HealthCheck => {
    return value.hasOwnProperty('healthCheckRating')
}

const getHealthCheckRating = (item: Entry) : number | undefined => {
    return isHealth(item) ? item.healthCheckRating : undefined
}

const HealthRatingIcon: React.FC<{rating: number |undefined }> = ({rating}) => {
    switch (rating) {
        case rating = 0:
        return<Icon name="heart" color="green" />;
        case rating = 1:
        return<Icon name="heart" color="yellow" />;
        case rating = 2:
        return<Icon name="heart" color="orange" />;
        case rating = 3:
        return<Icon name="heart" color="red" />;
        default:
        return null;
    }
}


const HealthComponent: React.FC<{ entry: Entry }> = ({entry}) => {
    return (
        <Segment.Group>
        <Segment>
        <Header as='h3'> {entry.date} <Icon name='hospital'>
        </Icon> </Header>
         <Label text={'grey'}>{entry.description}</Label>
         <DiagnosisCodes codes={entry.diagnosisCodes} />
         <br></br>
        <HealthRatingIcon rating={getHealthCheckRating(entry)} />
         </Segment>
         </Segment.Group>
    )
  }

export default HealthComponent