import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name, email};

    // post data to server

    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      const newUsers = [...users, data];
      setUsers(newUsers);
    })
  }

  return (
    <div className="App">
      <h1>My own Users : {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='Name' />
        <input type="email" name='email' placeholder='Email' />
        <input type="submit" value="Add user" />
      </form>

      {
        users.map(user => <li key={user.id}>id: {user.id} name: {user.name} email: {user.email}</li>)
      }
    </div>
  );
}

export default App;
