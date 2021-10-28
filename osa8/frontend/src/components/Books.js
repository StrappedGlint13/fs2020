import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GENRE_FILTER } from '../queries'
import GenreSelection from './GenreSelection'
import { ALL_BOOKS } from '../queries'

const Books = ({ show, setError }) => {
  const [text, setText] = useState('All genres')
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    onError: (error) => {
      setError([error][0].message)
    }
  })
  const [getGenre, res]  = useLazyQuery(GENRE_FILTER, {
    onError: (error) => {
      setError([error][0].message)
    }
  })

  useEffect(() => {
    if (res.data) {
      setGenre(res.data.allBooks)
    }
  }, [res])

  if (!show) {
    return null
  }

  const showGenre = (genre) => {    
    setText(genre) 
    getGenre({ variables: { genre: genre } }) 
    
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>Books</h2>
      {genre ? <p> in genre <b>{text}</b> </p> : <p> All genres </p>}
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
          {genre ? genre.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ) : books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <GenreSelection books={books} showGenre={showGenre} 
      setGenre={setGenre} />
    </div>
  )
}

export default Books