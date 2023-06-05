import './App.css';
import Home from './components/Home';
import CrudForm from './components/CrudForm';
import Update from './components/Update';
import Register from './components/register/Register';
import Login from './components/login/Login';
import IndividualDetails from './components/IndividualDetails';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/crud/:id" element={<CrudForm />} />
            <Route path="/home/update/:id" element={<Update />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/individualDetails" element={<IndividualDetails />} />
            {/* <Redirect to="/login" /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
