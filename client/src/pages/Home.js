import React from "react";
import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';
import ProviderList from "../components/ProviderList";

const Home = () => {

  return (
    <div className="container">
      <CategoryMenu />
      <Cart />
      <ProviderList />
    </div>
  );
};

export default Home;

/*
<ProviderList 
 providers={providers}
 />
 */