import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import axios from 'axios'


const Persons = props => 
      <p>
        {props.persons.map((person, i) => <Person key={i} person={person} /> 
        )}
      </p>
  
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

  useEffect(() => {      
    axios      
      .get('http://localhost:3001/persons')      
      .then(response => {        
        console.log('promise fulfilled')        
        setPersons(response.data)      })  }, [])  
        console.log('render', persons.length, 'persons')
  

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
      <Filter filter={filter} handle={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addnew={addNew} handle1={handlePersonChange}
      handle2={handleNumberChange} newname={newName} 
      newnumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={filteredNames} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))