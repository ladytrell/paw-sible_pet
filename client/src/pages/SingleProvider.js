import React from "react";
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

    const handleAddFavorite = async (event) => {
        try {
            await addFavorite({
                variables: { id: providerId }
            });
        } catch(e) {
            console.error(e);
        }
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
                    {provider.availability}
                    <img src={provider.image} alt={`Image of ${provider.name}`} />
                    <button onClick={() => handleAddFavorite(provider._id)}>Add to favorite</button>
                </div>
            </div>
        </div>
    );
};

export default SingleProvider;