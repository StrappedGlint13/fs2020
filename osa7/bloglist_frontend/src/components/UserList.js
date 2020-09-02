import React from 'react'
import {
    Link
} from "react-router-dom"

const UserList = ( {users} ) => {
  /* const usersStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5
  }  */
  
  return (
    <div>
    <h2>Users</h2>
    <table className="table">
      <thead className="thead-light">
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user => <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>
            {user.name}</Link></td>
            <td>{user.blogs.reduce((sum) => 
          sum + 1, 0)}</td> 
      </tr>)}
      </thead>
      </table>
  </div>
  )
}

  
export default UserList