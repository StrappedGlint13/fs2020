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
    const personObject = {
      name: newName,

    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }


  return (

    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:  <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {rows()}
      </ul>
    </div>
  )

}

export default App