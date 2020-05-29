
import React from 'react'
import Person from './Person'

const Persons = props => 
      <div>
        {props.persons.map((person, i) => <Person key={i} name={person.name} number={person.number}
        removePerson={() => props.removePerson(person.id)}
        />
        )}
      </div>

export default Persons