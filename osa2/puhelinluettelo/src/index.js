import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredNames = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h2> Phonebook </h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
      <h2>add a new</h2>
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
        {filteredNames.map((person, i) => <Person key={i} person={person} /> 
        )}
      </p>
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))