import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function CrudForm() {
  const { id } = useParams('');
  // console.log(id);
  const history = useNavigate();
  const [people, setPeople] = useState({
    userId: id,
    name: '',
    email: '',
    number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPeople({
      ...people,
      [name]: value,
    });
  };

  const addPeople = async () => {
    const { name, email, number } = people;
    if (name && email && number) {
      await axios
        .post('http://localhost:5000/crud/create', people)
        .then((res) => {
          // nicher if_else statement ta backend theke data fatch kore kora hoyeche

          // if (res.data === 'fail') {
          //   alert('User already exist, enter new email');
          // } else {
          //   alert('Registration successfull');
          //   console.log(res);
          //   setPeople({
          //     name: '',
          //     email: '',
          //     number: '',
          //   });
          //   history('/', { state: { data: res.data } });
          // }
          console.log(res);
          setPeople({
            name: '',
            email: '',
            number: '',
          });
          history('/home', { state: { data: res.data } });
        });

      // history('/');
    } else {
      alert('invlid input...');
    }
  };

  return (
    <div className="my-5">
      {/* {console.log(people)} */}
      <h1>CrudForm</h1>
      <div className="col ">
        <div className="row my-2">
          <input
            type="text"
            name="name"
            value={people.name}
            placeholder="Name"
            // required="true"
            onChange={handleChange}
          ></input>
        </div>

        <div className="row my-2">
          <input
            type="text"
            name="email"
            value={people.email}
            placeholder="Your Email"
            // required="true"
            pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
            onChange={handleChange}
          ></input>
        </div>

        <div className="row my-2">
          <input
            type="number"
            name="number"
            value={people.number}
            placeholder="P.number"
            // required="true"
            onChange={handleChange}
          ></input>
        </div>
        <div className="row my-2">
          <button type="button" className="btn btn-success" onClick={addPeople}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
