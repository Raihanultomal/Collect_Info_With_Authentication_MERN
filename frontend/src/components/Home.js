import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import IndividualDetails from './IndividualDetails';

export default function Home() {
  // login koreche jei user tar data collect kora hocce
  // data gulo login thekei pathano hoise
  const location = useLocation();
  const loginUserData = location.state.data;
  // console.log(loginUserData);
  const { name, _id } = loginUserData;
  // console.log(_id);
  const [data, setData] = useState([]);
  const [showDetails, setShowDetails] = useState('');
  // const [deleteData, setDeletedata] = useState([]);
  const showPeople = async () => {
    await axios.get(`http://localhost:5000/${_id}`).then((res) => {
      // const { data } = res;
      // console.log(res);
      setData(res.data);
    });
  };
  console.log(data);
  useEffect(() => {
    showPeople();
  }, []);

  // delete people

  const deletePeople = async (id) => {
    console.log(id);
    await axios
      .delete(`http://localhost:5000/crud/delete/${id}`)
      .then((res) => {
        // console.log(res);
        alert(res.data);
        console.log(res.data);
        showPeople();
      });
  };

  // individual details

  // const toggleModal = () => {
  //   setShowDetails(!showDetails);
  // };

  const details = async (item) => {
    // console.log(id);
    console.log(item);

    setShowDetails(item);
  };

  return (
    <div>
      {/* {_id ? <h3>Hi {name}</h3> : <h3>Please login first</h3>} */}

      {/* single data click korle details dekhanor jonne popup window create kora hoyeche */}
      <IndividualDetails
        detailsData={showDetails}
        data-bs-toggle={'modal'}
        data-bs-target={'#staticBackdrop'}
      />

      <div className="my-3 bg-secondary">
        <div className="row p-1">
          <div className="col-9 ">
            <h3 style={{ color: 'white' }}>Hi : {name}</h3>
          </div>
          <div className=" col-3">
            <Link to="/">
              <button type="button" className="btn btn-warning">
                Logout
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-9">
          <h1>Home</h1>
        </div>
        <div className="col-3 my-3">
          <Link to={`/crud/${_id}`}>
            <button type="button" className="btn btn-success">
              Add data
            </button>
          </Link>
        </div>
      </div>
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr>
              <th>{(index += 1)}</th>
              <td>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  // uporer ei 3 ta jinis bootstrap er Model theke nea
                  // onClick={() => details(item._id)}
                  onClick={() => details(item)}
                  style={{ border: 'none', background: 'none' }}
                >
                  {item.name}
                </button>
              </td>

              <td>{item.email}</td>
              <td>{item.number}</td>

              <td className="d-flex justify-content-between">
                <div className="row ">
                  <div className=" col m-1">
                    {/* {pathname:`update/${item._id}`} */}
                    <NavLink to={`update/${item._id}`}>
                      <button type="button" className="btn btn-secondary">
                        Update
                      </button>
                    </NavLink>
                  </div>
                  <div className=" col my-1">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deletePeople(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
