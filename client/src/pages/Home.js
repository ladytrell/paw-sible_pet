import React from "react";
import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';
import ProviderList from "../components/ProviderList";

import { useQuery } from "@apollo/client";
import { QUERY_PROVIDERS } from "../utils/queries";

const Home = () => {
  const { data } = useQuery(QUERY_PROVIDERS);
  const providers = data?.providers || [];
  console.log(providers);

  return (
    <div className="container">
      <CategoryMenu />
      <Cart />
      <ProviderList 
        providers={providers}
      />
    </div>
  );
};

export default Home;
