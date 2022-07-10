import React from "react";
import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <Cart />
    </div>
  );
};


export default Home;
