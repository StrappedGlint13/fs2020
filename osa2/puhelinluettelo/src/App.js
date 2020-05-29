import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Error from './components/Error'
import personService from './personService/persons'
import './index.css'



const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const [ message, setMessage] = useState()
  const [ error, setError ] = useState()

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
        setMessage(
          `Number changed successfully`
        )
        setTimeout(() => {
          setMessage(null)
          }, 5000) 
      })
      .catch(error=> {
        setMessage(
          'Error occurred'
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
      setMessage(
        `Added ${personObject.name}`
      )
      setTimeout(() => {
        setMessage(null)
        }, 5000)     
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
    ).then()

    .catch(error => {
        setError(
          `Information of ${person.name} was already deleted from server`
        )
        setTimeout(() => {
          setError(null)
          }, 5000) 
        setPersons(persons.filter(n => n.id !== id))     
      })
      setMessage(
        `Removed ${person.name}`
      )
      setTimeout(() => {
        setMessage(null)
        }, 5000)
      
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
      <Notification message={message} />
      <Error error={error} />
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