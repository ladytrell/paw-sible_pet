import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { QUERY_PROVIDER } from "../utils/queries";


const SingleProvider = (props) => {
    const { id: providerId } = useParams();
    const { loading, data } = useQuery(QUERY_PROVIDER, {
        variables: { id: providerId }
    });

    const provider = data?.provider || {};

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
                </div>
            </div>
        </div>
    );
};

export default SingleProvider;