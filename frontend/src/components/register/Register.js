import React, { useState } from 'react';
import './register.css';
import axios from 'axios';

import { NavLink, useNavigate, Link } from 'react-router-dom';
// import useHistory from 'use-history';

const Register = () => {
  const history = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    reEnterPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      await axios.post('http://localhost:5000/register', user).then((res) => {
        // nicher if_else statement ta backend theke data fatch kore kora hoyeche
        if (res.data === 'fail') {
          alert('User already exist, enter new email');
        } else {
          alert('Registration successfull');
          // history('/login');
          history('/');
        }
      });
    } else {
      alert('invlid input...');
    }
  };

  return (
    <div className="register my-5">
      {console.log('User', user)}
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Your Name"
        required="true"
        onChange={handleChange}
      ></input>
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
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="Re-enter Password"
        onChange={handleChange}
      ></input>
      <div className="button">
        <NavLink
          style={{ textDecoration: 'none' }}
          onClick={register}
          // to="/login"
          // exact
        >
          Register
        </NavLink>
      </div>

      <div>or</div>
      <Link to="/">Already have an account?</Link>
    </div>
  );
};

export default Register;
