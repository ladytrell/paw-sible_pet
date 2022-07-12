import React from "react";
import { Link } from "react-router-dom";
const ProviderList = ({ providers }) => {
    if (!providers.length) {
        return <h3>No Providers Found.</h3>
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
                            <p>Rate: {provider.price}</p>
                            <p>Category: {provider.category}</p>
                            <p>Availability: {provider.availability}</p>
                        </div>
                    </div>

                ))}
        </div>
    );
};

export default ProviderList;