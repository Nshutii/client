import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { getCategories, list } from "./apiCore";
import Card from "./UCard";
import Menu from './Menu'
import Footer from './Footer'


const Find = ({ data, setData }) => {
  // const [data, setData] = useState({
  //   categories: [],
  //   category: "",
  //   search: "",
  //   results: [],
  //   searched: false
  // });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        response => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  // const handleChange = name => event => {
  //   setData({ ...data, [name]: event.target.value, searched: false });
  // };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div className="row">
        <div className=" search-container  ">
          <h2 className="mt-4 mb-4">
            {searchMessage(searched, results)}
          </h2>

          <div className="searchprod row" >
            {results.map((product, i) => (
              <div key={i} className=" col-md-4 col-sm-12 mb-3">
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };



  return (
    <div >
      {<Menu />}
      <div>
        {searchedProducts(results)}
      </div>
      {<Footer />}
    </div>
  );
};

export default Find;  