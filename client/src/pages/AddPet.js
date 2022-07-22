import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_PET } from '../utils/mutations';

/*
import { useNavigate } from 'react-router-dom';  
const navigate = useNavigate();
navigate("/");
 */

function AddPet(props) {
  const [formState, setFormState] = useState({ name: '', breed: '', age: 1 });
  const [addPet] = useMutation(ADD_PET);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try{
      const mutationResponse = await addPet({
        variables: {
          name: formState.name,
          breed: formState.breed,
          age: parseInt(formState.age)
        },
      });
      const petData = mutationResponse.data.addPet;
      console.log(petData);
      window.location.replace("/pets");
    } catch (err){
      console.log(err.message)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
    <Link to="/">← Back to Providers</Link>

      <h2>AddPet</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="name">Name:</label>
          <input
            placeholder="Name"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="breed">Breed:</label>
          <input
            placeholder="Breed"
            name="breed"
            type="breed"
            id="breed"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Age:</label>
          <input
            placeholder="0"
            name="age"
            type="age"
            id="age"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddPet;
