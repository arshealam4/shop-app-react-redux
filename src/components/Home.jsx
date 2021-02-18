import React from "react";
import Product from "./Product";
import Category from './Category';

export const Home = () => {
  return (
    <div className="row">
      <div className="col-4 mt-4">
        <Category />
      </div>
      <div className="col-8">
        <Product />
      </div>
    </div>
  )
}