import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function Update() {
  const history = useNavigate();
  const [people, setPeople] = useState({
    userId: '',
    name: '',
    email: '',
    number: '',
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setPeople({
      ...people,
      [name]: value,
    });
  };

  const { id } = useParams('');
  // console.log(id);
  useEffect(() => {
    getIndividualData();
  }, []);

  const getIndividualData = async () => {
    await axios.get(`http://localhost:5000/update/data/${id}`).then((res) => {
      // const { data } = res;
      // console.log(res);
      setPeople(res.data);
      // console.log(res.data);
    });
  };

  // const { userId } = people;
  // console.log(userId);

  const updateIndividualData = async () => {
    await axios
      .put(`http://localhost:5000/crud/update/${id}`, people)
      .then((res) => {
        console.log(res);
        // alert(res.data);
        alert('Successfull');

        // console.log(userId);
        history('/home', { state: { data: res.data } });
      });
  };

  return (
    <div>
      <h1>Update</h1>
      <div className="my-5">
        {/* {console.log(people)} */}
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
            <button
              type="button"
              className="btn btn-success"
              onClick={updateIndividualData}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
