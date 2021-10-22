import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show, setError }) => {
  const result = useQuery(ME, {
    onError: (error) => {
        setError([error][0].message)
    }
  })
  const book_result = useQuery(ALL_BOOKS, {
    onError: (error) => {
        setError([error][0].message)
    }
  })

  if (book_result.loading) {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }

  const recommend = result.data.me.favoriteGenre
  const books = book_result.data.allBooks
  const favorites = books.filter(b => b.genres.includes(recommend))
  
  return (
    <div>
      <h2>Books</h2>
      <p>books in your favorite genre <b>{recommend}</b> </p>
      <table>
        <tbody>
          <tr>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {favorites.map(f => 
                <tr key={f.title}>
                    <td>{f.title}</td>
                    <td>{f.author.name}</td>
                    <td>{f.published}</td>
                </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
