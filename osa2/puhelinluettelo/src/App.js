import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './personService/persons'

const Persons = props => 
      <div>
        {props.persons.map((person, i) => <Person key={i} name={person.name} number={person.number}
        removePerson={() => props.removePerson(person.id)}
        />
        )}
      </div>

const Filter = (props) => 
    <div>
      filter shown with <input value={props.filter} onChange={props.handle} />
    </div>

const PersonForm = (props) =>
    <form onSubmit={props.addnew}>
    <div>
      name: <input value={props.newname}
      onChange={props.handle1} />
    </div>
    <div>
      number: <input value={props.newnumber}
      onChange={props.handle2} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
    </form>


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const personObject = {
    name: newName,
    number: newNumber,
  }

  useEffect(() => {      
    personService      
      .getAll()      
      .then(response => {        
        console.log('promise fulfilled')        
        setPersons(response)      })  }, [])  
        console.log('render', persons.length, 'persons')


  const addNew = (event) => {
    if (persons.map((person) => person.name.toUpperCase()).includes(newName.toUpperCase())) {
      const per = persons.find(n => n.name.toUpperCase() === newName.toUpperCase())
      const changedPer = {...per}

      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
        .update(changedPer.id, personObject)
        .then(returnedPer => {
        setPersons(persons.map(n => n.id !== returnedPer.id ? per : returnedPer))
      })
      .catch(error=> {
        alert(`failed`)
        setPersons(persons.filter(n => n.id !== changedPer.id))
      })
    }
    } else {
      personService
      .create(personObject)
      .then(response => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewNumber('')
    })
  }


  }

  const removePerson = (id) => {
    const person = persons.find(n => n.id === id)

    if(window.confirm(`Delete ${person.name}?` )) {
        personService
        .remove(id)
        .then(
        setPersons(persons.filter(person => person.id !== id))
    )
    .catch(error => {
        alert(
          `the person'${person.name}' was already deleted from server`
        )
        setPersons(persons.filter(n => n.id !== id))     
      })

}

}


  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  const filteredNames = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h2> Phonebook </h2>
      <Filter filter={filter} handle={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addnew={addNew} handle1={handlePersonChange}
      handle2={handleNumberChange} newname={newName} 
      newnumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={filteredNames} removePerson={removePerson}/>
    </div>
  )

}

export default App