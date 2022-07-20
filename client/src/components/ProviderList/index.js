import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PROVIDERS } from '../../utils/actions';
import { QUERY_PROVIDERS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import spinner from '../../assets/spinner.gif';

//const ProviderList = ({ providers }) => {
const ProviderList = () => {
    // Retrieve current state
    const [state, dispatch] = useStoreContext();

    const { currentCategory } = state;
    //Reload the <div> with queried data
    const { loading, data } = useQuery(QUERY_PROVIDERS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_PROVIDERS,
                providers: data.providers
            });
        }
    }, [data, loading, dispatch]);

    function filterProviders() {
        if (!currentCategory) {
            return state.providers;
        }

        return state.providers.filter(provider => provider.category._id === currentCategory);
    }

    //If no providers are present display message
    if (!state.providers.length) {
        return <h3>No Providers Found.</h3>
    }

    return (
        <div>
            {/*Filter list by category if selected*/}
            {filterProviders().map((provider) => (
                <div key={provider._id} className="card mb-3">
                    <p className="card-header provider-header">
                        <Link
                            to={`/provider/${provider._id}`}
                            style={{ fontWeight: 700 }}
                            className="text-light"
                        >
                            {provider.name}
                        </Link>
                    </p>
                    <div className="card-body provider-card">
                        <p><span className="font-weight-bolder">Rate: </span>${provider.price}</p>
                        <p><span className="font-weight-bolder">Category: </span>{provider.category.name}</p>
                        <p><span className="font-weight-bolder">Availability:</span></p>
                        <ul>{provider.availability.map((day, key) => {
                            return <li key={key}>{day}</li>
                        })}</ul>
                    </div>
                </div>
            ))}
            {loading ? <img src={spinner} alt="loading" /> : null}
        </div>
    );
};

export default ProviderList;