import React from "react";


const GenreSelection = ( { books, showGenre, setGenre } ) => {
    let allGenres = []
    allGenres = books.flatMap(a => [...allGenres, ...a.genres])
    allGenres = allGenres.filter((item, i) => allGenres.indexOf(item) === i)

    return (
      <div>
        <h2>Genres</h2>
        {allGenres.map(g => 
          <button key={g} onClick={() => showGenre(g)}> 
            {g} 
          </button> 
          )}
         <button onClick={() => setGenre(null)}> All genres </button>
        
      </div>
    )
  }

export default GenreSelection