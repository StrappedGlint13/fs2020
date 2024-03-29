import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { ALL_AUTHORS, ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Authors = ({ show }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ addBook ] = useMutation(ALL_BOOKS)
  
/*, {
    pollInterval: 2000
  } */


  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }
  
  if (!show) {
    return null
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
  
    addBook({ variables: { name, born: parseInt(born, 10) } })

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
          Set birtyear
        </h2>
        <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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