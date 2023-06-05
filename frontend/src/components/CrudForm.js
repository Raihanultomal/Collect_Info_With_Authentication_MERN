import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function CrudForm() {
  const { id } = useParams('');
  console.log(id);
  const history = useNavigate();
  const handleGoBackHome = () => {
    history(-1); // Go back one step in the history stack
  };
  const [people, setPeople] = useState({
    userId: id,
    name: '',
    email: '',
    number: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPeople({
      ...people,
      [name]: value,
    });
  };

  const imageUpload = (e) => {
    // console.log(e.target.files[0]);
    setPeople({
      ...people,
      image: e.target.files[0],
    });
  };

  const addPeople = async () => {
    const { name, email, number, userId } = people;
    // console.log(image, '====', image.name);
    if (name && email && number && userId) {
      // FormData() ekta builtin function
      // eta file type er data store korte pare
      const formdata = new FormData();

      formdata.append('image', people.image, people.image.name);
      formdata.append('name', people.name);
      formdata.append('email', people.email);
      formdata.append('number', people.number);
      formdata.append('userId', people.userId);

      await axios
        .post('http://localhost:5000/crud/create', formdata)
        .then((res) => {
          // nicher if_else statement ta backend theke data fatch kore kora hoyeche

          if (res.data === 'fail') {
            alert('User already exist, enter new email');
          } else {
            console.log(res);
            setPeople({
              name: '',
              email: '',
              number: '',
            });
            // alert('Registration successfull');

            history('/home', { state: { data: res.data } });
          }
        });

      // history('/');
    } else {
      alert('invlid input...');
    }
  };

  return (
    <div className="my-5">
      <div className="row my-3">
        <div className="col-9">
          <h1>CrudForm</h1>
        </div>
        <div className="col-3 my-2">
          <button className="btn btn-success" onClick={handleGoBackHome}>
            Go Back
          </button>
        </div>
      </div>
      {/* {console.log(people)} */}

      <div className="col ">
        <div className="row my-2">
          <input
            className="form-control"
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
            className="form-control"
            type="email"
            name="email"
            value={people.email}
            placeholder="Your Email"
            // required="true"
            // pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
            onChange={handleChange}
          ></input>
        </div>

        <div className="row my-2">
          <input
            className="form-control"
            type="number"
            name="number"
            value={people.number}
            placeholder="P.number"
            // required="true"
            onChange={handleChange}
          ></input>
        </div>
        <div className=" d-flex flex-row mb-3">
          <div className="imageLabel mx-2">
            <label style={{ color: 'red' }}>Upload your image</label>
          </div>
          <div className="uploadImage">
            <input
              className="form-control"
              type="file"
              name="image"
              // value={people.number}
              // placeholder="P.number"
              // required="true"
              accept="image/*"
              onChange={imageUpload}
            ></input>
          </div>
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
