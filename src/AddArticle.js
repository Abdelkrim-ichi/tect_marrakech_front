import React, { useState, useEffect } from 'react';
import axios from "axios";

function AddArticle() {
  const [nom, setName] = useState();
  const [lastname, setLastName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [show, setShow] = useState(false);
  const [employeId, setEmployeId] = useState();
  const [url] = useState('http://marrakech_test_backend.test/api/employes');

  const [employes, setEmployes] = useState([]);

  useEffect(() => {
    handleGetEmployesList();
  }, []);

  const handleGetEmployesList = () => {
    axios.get(url)
    .then(function (response) {
      setEmployes(response.data.employes)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const resetFields = () => {
    setName('');
    setLastName('');
    setAddress('');
    setPhone('');
  }

  const handleAddArticle = () => {
    let data = {
      name: nom,
      lastname: lastname,
      address: address,
      phone: phone
    };

    axios.post(url, data)
    .then(function (response) {
      resetFields();
      handleGetEmployesList();
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const handleEditArtile = () => {
    let data = {
      name: nom,
      lastname: lastname,
      address: address,
      phone: phone
    };
       
    axios.put(url + '/' + employeId, data)
    .then(function (response) {
      resetFields();

      setShow(false);
      handleGetEmployesList();
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const handleShowEmplye = (id) => {
    let data = {
      name: nom,
      lastname: lastname,
      address: address,
      phone: phone
    };
    setEmployeId(id)
   
    axios.get(url + '/' + id, data)
    .then(function (response) {
      setName(response.data.employe.name)
      setLastName(response.data.employe.lastname)
      setAddress(response.data.employe.address)
      setPhone(response.data.employe.phone)

      setShow(true)
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const handleRemoveArtile = (id) => {
    axios.delete(url + '/' + id)
    .then(function (response) {
      handleGetEmployesList();
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="name">Nom</label>
        <input type="text" name="nom" defaultValue={nom} onChange={(e) => setName(e.target.value)} className="form-control" id="nom" aria-describedby="nom" placeholder="Enter Name"/>
      </div>
      <div className="form-group">
        <label htmlFor="prenom">Prenom</label>
        <input type="text" name="lastname" defaultValue={lastname} onChange={(e) => setLastName(e.target.value)} className="form-control" id="prenom" aria-describedby="prenom" placeholder="Enter Prenom"/>
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <textarea type="text" name="address" defaultValue={address}  onChange={(e) => setAddress(e.target.value)} className="form-control" id="address" aria-describedby="address" placeholder="Enter Adresse"></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input type="text" name="phone" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="phone" placeholder="Enter Phone"/>
      </div>

      {
        !show &&
        <button onClick={handleAddArticle } className="btn btn-primary" name='submit'>Submit</button>
      }  
      {
        show &&
         <button onClick={handleEditArtile } className="btn btn-primary" name='submit'>Edit</button>
      }
      <br></br>
      <h1>liste des employes</h1>
      <ul className='list-group'>
        {employes.map((employe, index) => (
          <li className='list-group-item d-flex justify-content-between align-items-center' key={index}>
            {employe.name}
            <button className='btn btn-primary ' onClick={() => handleShowEmplye(employe.id)}>Modifier</button>
            <button className='btn btn-danger ' onClick={() => handleRemoveArtile(employe.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddArticle;
