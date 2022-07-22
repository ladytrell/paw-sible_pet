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
        variables: { _id: profile.data._id }
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
    if (error) return `Error! ${error.message}`;

    console.log(data);
    const pets = data.pets;
    console.log(pets);

    return (
        <div className="my-2">
            <h2>Our Pets:</h2>
            {pets.length ? (
            <div className="flex-row">
                {pets().map((pet) => (
                    <div>
                        <p>{pet.name}</p>
                        <p> {pet.breed}</p>
                        <p>{pet.mage}</p>
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