import React, { useState }  from "react";
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PROVIDER } from "../utils/queries";
import { ADD_FAVORITE } from "../utils/mutations";
import Auth from '../utils/auth';

const SingleProvider = (props) => {
    const { id: providerId } = useParams();
    console.log({providerId});
    const { loading, data } = useQuery(QUERY_PROVIDER, {
        variables: { id: providerId }
    });
    const [addFavorite] = useMutation(ADD_FAVORITE);

    const provider = data?.provider || {};
    console.log({provider});

    const handleAddFavorite = async (event) => {
        try {
            await addFavorite({
                variables: { id: providerId }
            });
        } catch(e) {
            console.error(e);
        }
    };

    //Set initial form state to empty
    const [formState, setFormState] = useState();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
    };

    const handleAddCart = async (event) => {
        event.preventDefault();
       /* try {
            const mutationResponse = await addReservation({
            variables: {
                timeSlot: formState.timeSlot,
                service: provider.category,
                provider: provider
            }})

        const reservation = mutationResponse.data.addReservation.reservation;
            
            dispatch({
                type: ADD_TO_CART,
                reservation: { ...reservation},
                });
                idbPromise('cart', 'put', { ...reservation});
        } catch(err){
            console.log(err.message);
        }*/
    };

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Link to="/">← Go Back</Link>
            <div className="card mb-3">
                <p className="card-header">
                    <span style={{ fontWeight: 700 }} className="text-light">
                        {provider.name}
                    </span>
                </p>
                <div className="card-body">
                    
                    <p>{provider.description}</p>
                    <p>Rate: ${provider.price}</p>
                    <p>Category: {provider.category.name}</p>
                    <p>Availability: </p>
                    {/*{provider.availability}*/}
                    <form>
                        <ul>{provider.availability.map((timeSlot, index) => (
                            <li key={index}>
                                <input type="radio" id={index} name="timeSlot" value={timeSlot} onClick={handleChange} />
                                <label htmlFor={index}>{timeSlot}</label>
                            </li>
                            ))}
                        </ul>                            
                        <button onClick={() => handleAddCart(provider._id)}>Add to Cart</button>
                    </form>
                    <img src={provider.image} alt={`${provider.name}`} />
                    {provider.availability}
                    <img src={`/images/profile/${provider.image}`} alt={`${provider.name}`} />
                    <button onClick={() => handleAddFavorite(provider._id)}>Add to favorite</button>
                </div>
            </div>
        </div>
    );
};

export default SingleProvider;