
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/customers-list');
      const jsonData = await response.json();
  
      console.log('API Response:', jsonData);
  
      if (jsonData.Customers && Array.isArray(jsonData.Customers)) {
        // Assuming jsonData.Customers is an array
        setUsers(jsonData.Customers);
      } else {
        console.error('Invalid data format:', jsonData);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };
  
 
  const handleRegister = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/create-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });

      const result = await response.json();
      console.log('Registration Result:', result);

      // After successful registration, fetch updated user data
      fetchData();
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="App-header">
          <h1>Register User</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button onClick={handleRegister}>Register</button>
      <h1>Customer List</h1>
      <ul>
        {users.map((customer, index) => (
          <li key={index}>
            <strong>Username:</strong> {customer.username},{' '}
            <strong>Email:</strong> {customer.email},{' '}
            <strong>Password:</strong> {customer.password}
          </li>
        ))}
      </ul>

  
    </div>
  );
}

export default App;


/*import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/customers-list');
      const jsonData = await response.json();
  
      console.log('API Response:', jsonData);
  
      if (Array.isArray(jsonData)) {
        setUsers(jsonData);
      } else {
        console.error('Invalid data format:', jsonData);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };
  

  return (
    <div className="App-header">
      <h1>User List</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>Username:</strong> {user.username}, 
            <strong> Password:</strong> {user.password}, 
            <strong> Email:</strong> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}*

export default App;
/* 
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/data');
      const jsonData = await response.json();
      setData(jsonData)  
    } catch (error) {
      console.error('Error', error);
    }
  };
  

  return (
    <div className="App-header">
      <h1>User List</h1>
      <h3>{data.message}</h3>
      
    </div>
  );
}
*/