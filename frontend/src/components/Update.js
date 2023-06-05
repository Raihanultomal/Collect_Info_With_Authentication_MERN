import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function Update() {
  // const historyToGoBack = useNavigate();

  const history = useNavigate();
  const handleGoBackHome = () => {
    history(-1); // Go back one step in the history stack
  };
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
        if (res.data === 'fail') {
          alert('User already exist, enter new email');
        } else {
          // alert(res.data);
          alert('Successfull');

          // console.log(userId);
          history('/home', { state: { data: res.data } });
        }
      });
  };

  return (
    <div style={{ width: '70%' }}>
      <div className="row my-3">
        <div className="col-9">
          <h1>Update</h1>
        </div>
        <div className="col-3 my-2">
          <button className="btn btn-success" onClick={handleGoBackHome}>
            Go Back
          </button>
        </div>
      </div>

      <div className="my-2">
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
              className="form-control"
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
