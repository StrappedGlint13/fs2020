import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Country = props => {
  return(
  <div>
    <h1>{props.country.name}</h1>
    <div>capital {props.country.capital}</div>
    <div>population {props.country.population}</div>
    <h2>languages</h2>
    <ul>
    {props.country.languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={props.country.flag} alt="flag" width="250" height="200" />
  </div>
  )
}

const Countries = props => {
  const filteredNames = props.countries.filter(country => country.name.toUpperCase().includes(props.filter.toUpperCase()))
  if(filteredNames.length === 1) {
    return(
    <div>
        <Country country={filteredNames[0]} />
    </div>
    )
  }
  else if (filteredNames.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if(filteredNames.length < 11) {
    return(
    <div>
      <p>
        {filteredNames.map(country => <p key={country.name}> {country.name}
          <button onClick={(event) => {props.handleClick(country.name)}}> show </button> </p> 
        )}
      </p>
      </div>
       )
  }
}

const Filter = (props) =>
    <div>
      find countries <input value={props.filter} onChange={props.handle} />
    </div>

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {      
    axios      
      .get('https://restcountries.eu/rest/v2/all')      
      .then(response => {             
        setCountries(response.data)      })  }, [])  

const handleFilterChange = (event) => {
  setFilter(event.target.value)
}

const handleClick = (name) => {
  console.log(name)
  setFilter(name)
}

console.log(filter)
  return (
    <div>
      <Filter filter={filter} handle={handleFilterChange} />
      <Countries countries={countries} filter={filter} handleClick={handleClick}  />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
