import React from 'react';
import {
  API
} from "../config";
import Product from './Product';
// import getProducts from './apiCore/getProducts'

export default function Phone() {

  const products = async (sortBy) => {
    return await fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=10`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
        console.log(response.json());
      })
      .catch(err => console.log(err));
  };

  products();

  const getCategories = () => {
    return fetch(`${API}/categories`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };



  return (
    <div>
    </div>
  )
}
