import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { REMOVE_FAVORITE } from '../utils/mutations';
import Auth from '../utils/auth';
import FavoritesList from '../components/FavoritesList';

const Favorites = (props) => {
    const { id: userParam } = useParams();
    const [deleteFavorite] = useMutation(REMOVE_FAVORITE);
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { _id: userParam },
    });

    if(loading) {
        return <h1>Loading User</h1>
    }

    const user = data.me || data.user || {};
    console.log('user', user)

    // const handleDeleteFavorite = async(event) => {
    //     try {
    //         await deleteFavorite({
    //             variables: { id: providerId }
    //         });
    //     } catch(e) {
    //         console.error(e);
    //     }
    // };

    const loggedIn = Auth.loggedIn()
    const profile = Auth.getProfile();


    console.log(profile.data._id);
    if(!loggedIn || profile.data._id !== userParam) {
        return (
            <h4>
              You need to be logged in to see this. Use the navigation links above.
            </h4>
          );
    }

    if (!user.favorites) {
            return <h3>No Favorites Found.</h3>
        }

    return (
        <div>
        <Link to="/">← Go Back</Link>
            <div>
                <h2>{userParam ? `${user.firstName}'s` : 'your'} Favorites</h2>
            </div>
            <div>
                <FavoritesList
                    providers={user.favorites}
                />
            </div>
        </div>
    );
};

export default Favorites;