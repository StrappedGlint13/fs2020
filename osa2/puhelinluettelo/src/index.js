import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  const addNew = (event) => {
    event.preventDefault()
    
    if (persons.map((person) => person.name.toUpperCase()).includes(newName.toUpperCase())) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      const personObjet = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObjet))
      setNewName('')
      setNewNumber('')
    }
  
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    
    <div>
      
      <h2>Phonebook</h2>
      <form onSubmit={addNew}>
        <div>
          name: <input value={newName}
          onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <p>
        {persons.map((person, i) => <Person key={i} person={person} /> 
        )}
      </p>
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))