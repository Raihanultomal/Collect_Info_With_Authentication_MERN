import React, { useState } from 'react';
import './login.css';
import axios from 'axios';

import { NavLink, useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const history = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  // Login er pore user er name/data collect korar jonne
  // const [name, setName] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async () => {
    const { email, password } = user;
    if (email && password) {
      await axios.post('http://localhost:5000/login', user).then((res) => {
        if (res.data === 'fail') {
          alert('Enter valied Email and Password');
          // console.log(res);
        } else {
          alert('Login successfull');
          console.log(res);
          // login korle eikhan theke user er name home page e pathano hobe
          // const data = res.data;
          // console.log(data);
          history('/home', { state: { data: res.data } });
          // history('/');
        }
      });
    } else {
      alert('invlid input...');
    }
  };

  return (
    <div className="login my-5">
      {/* <Home userName={userName} /> */}
      {console.log('User', user)}
      <h1>Login</h1>

      <input
        type="text"
        name="email"
        value={user.email}
        placeholder="Your Email"
        required="true"
        pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Your Password"
        required="true"
        onChange={handleChange}
      ></input>

      <div className="button">
        <NavLink
          style={{ textDecoration: 'none' }}
          onClick={login}
          // to="/"
          // exact
        >
          Login
        </NavLink>
      </div>

      <div>or</div>
      <Link to="/register">Do not have any account?</Link>
    </div>
  );
};

export default Login;
