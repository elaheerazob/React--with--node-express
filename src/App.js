import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handelAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user ={name, email};

    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((data) => {
        const newUser =[...users,data]
        setUsers(newUser)
        console.log(data);
      });
  };
  return (
    <div className="App">
      <h1>This server {users.length}</h1>

      <form onSubmit={handelAddUser}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="submit" value="Add User" />
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            id: {user.id} name: {user.name} email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
