import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PETS } from '../../utils/queries';
import Auth from "../../utils/auth";
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import { Link } from "react-router-dom";

function PetList() {
  
    const loggedIn = Auth.loggedIn();
    const profile = Auth.getProfile();

    console.log('profile.data',profile.data._id);
    const { loading, error, data } = useQuery(QUERY_PETS, {
        variables: { id: profile.data._id }
    });

    if(!loggedIn){
        return (
            <div>
                <p>Please login to view your pets</p>
                <Link to="/login">
                Login
                </Link>
            </div>
        )
    }

 
    /* 
    useEffect(() => {
    if (data) {
        data.pets.forEach((pet) => {
        idbPromise('pets', 'put', pet);
        });
    } else if (!loading) {
        idbPromise('pets', 'get')
    }
    }, [data, loading]);
    */
    if (loading) return 'Loading...';
    if (error)
    {
        return (
        <div className="container my-1 error">
            <p>{error.message}</p>
        </div>
    )}

    console.log(data);
    const pets = data.pets;
    console.log(pets);

    return (
        <div className="my-2">
            <h2>Your Pets:</h2>                            
            <Link to="/addPet"><h3>Add Pets</h3></Link>
            
            {pets.length ? (
                <div className="flex-row">
                    {pets.map((pet) => (
                        <div className="card mb-3">
                            <p className="card-header provider-header">{pet.name}</p>
                            <p> {pet.breed}</p>
                            <p>{pet.age}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <h3>You haven't added any pets yet!</h3>
            )}
            {loading ? <img src={spinner} alt="loading" /> : null}
        </div>
    );
}

export default PetList;