import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { QUERY_FAVORITES, QUERY_USER } from '../../utils/queries';

function FavoritesList() {

    const loggedIn = Auth.loggedIn();
    const profile = Auth.getProfile();

    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { _id: profile.data._id }
    });

    const favs = data?.user.favorites || {};

    console.log('favs',favs);

    if (!favs.length) {
        return (
            <h3>You have no favorites.</h3>
        )
    }

    return (
        <div>
            <Link to="/">← Go Back</Link>
            <h2>Your Favorites</h2>
                <div>
                    {favs.map(({_id, name, price, category, availability}) => {
                        return (
                            <div className="card mb-3">
                                <p className="card-header provider-header">
                                    <Link
                                    to={`/provider/${_id}`}
                                    style={{ fontWeight: 700 }}
                                    className="text-light"
                                    >
                                        {name}
                                    </Link>
                                </p>
                                <div className="card-body provider-card">
                                    <p><span className="font-weight-bolder">Rate: </span>${price}</p>
                                    <p><span className="font-weight-bolder">Category: </span>{category.name}</p>
                                    <p><span className="font-weight-bolder">Availability:</span></p>
                                    <ul>{availability.map((day, key) => {
                                        return <li key={key}>{day}</li>
                                    })}</ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
            <p></p>
        </div>
    );
};

export default FavoritesList;