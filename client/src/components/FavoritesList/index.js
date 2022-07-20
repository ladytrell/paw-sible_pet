import React, { useEffect }  from "react";
import { Link } from "react-router-dom";
// import { useQuery } from "@apollo/client";
// import { QUERY_PROVIDERS } from "../../utils/queries";
// import Auth from '../../utils/auth';

const FavoritesList = ({ providers }) => {
    // const { data } = useQuery(QUERY_PROVIDERS);
    // const providers = data?.providers || [];

    // const profile = Auth.getProfile();

    // console.log('profile' + profile.firstName);
    
    if (!providers.length) {
        return <h3>No Favorites Found.</h3>
    }

    return (
        <div>
            {providers &&
            providers.map(provider => (
                <div key={provider._id} className="card mb-3">
                    <p className="card-header">
                        <Link
                            to={`/provider/${provider._id}`}
                            style={{ fontWeight: 700 }}
                            className="text-light"
                        >
                        {provider.name}
                        </Link>
                    </p>
                    <div className="card-body">
                        <p>Rate: ${provider.price}</p>
                        {/* <p>Category: {provider.availability}</p> */}
                        <p>Availability: {provider.availability}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FavoritesList;