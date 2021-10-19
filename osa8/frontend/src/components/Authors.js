import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR, ALL_BOOKS } from '../queries'
import Select from 'react-select';

const Authors = ({ show }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  

  useEffect(() => console.log(name.value))
  

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS} ]
  })
  
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }
  
  if (!show) {
    return null
  }

  const authors = result.data.allAuthors
  const options = authors.map(a => ({value: a.name, label: a.name}))

  const submit = async (event) => {
    event.preventDefault()
    
    editAuthor({ variables: { name: (name.value), setBornTo: parseInt(born, 10) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h2>
          Set birth year
        </h2>
        <form onSubmit={submit}>
        <div>
          <Select    
            as="select"
            options={options}
            value={name}
            onChange={setName}>
            </Select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
      </div>
    </div>
    
  )
}

export default Authors