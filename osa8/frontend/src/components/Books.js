
import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS } from '../queries'

const Books = ({ show, setError }) => {
  const result = useQuery(ALL_BOOKS, {
    onError: (error) => {
      setError([error][0].message)
    }
  })

/**, {
    pollInterval: 2000
  })
   */
  
  if (result.loading) {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }
  console.log(result.data.allBooks)
  const books = result.data.allBooks
 

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books