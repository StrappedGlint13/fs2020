import React from 'react'

const UserList = ( {users} ) => {
  const usersStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5
  }  
  
  return (
    <div style={usersStyle}>
    <h2>Users</h2>
    <table>
      <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user => <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.reduce((sum) => 
          sum + 1, 0)}</td> 
      </tr>)}
      </tbody>
      </table>
  </div>
  )
}

  
export default UserList