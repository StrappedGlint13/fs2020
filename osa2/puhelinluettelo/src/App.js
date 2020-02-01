import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [persons, setPersons] = useState([]
  )
  const [newName, setNewName] = useState()

  const rows = () => persons.map(person =>
    <Person
      key={person.name}
      person={person}
    />
  )

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map((person) => person.name.toUpperCase()).includes(newName.toUpperCase())) {
      window.alert(`${newName} is already added to phonebook`)
    } else {

      const personObject = {
        name: newName,
      }

      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        name:  <input value={newName} onChange={handlePersonChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>
  )

}

export default App