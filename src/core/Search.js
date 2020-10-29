import React, { useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';
import { getCategories, list } from "./apiCore";
import Card from "./SearchCard";
// import Menu from './Menu'
// import Footer from './Footer'


const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });

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

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchMessage = (searched, results) => {
        // if (searched && results.length > 0) {
        //     return `Found ${results.length} products`;
        // }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };

    const searchedProducts = (results = []) => {
        return (
            <div id='searchprod' className="row overlap searchedP ">
                <div className=" search-container  ">
                    <h2 className="text-center">
                        {searchMessage(searched, results)}
                    </h2>

                    <div className="searchprod row ml-1" >
                        {results.map((product, i) => (
                            <div key={i} >
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>

            <div className="navigation-search">


                <input
                    // id='s-input'
                    type="search"
                    onChange={handleChange("search")}
                    placeholder="Search by name"
                />
                <Link to='' onClick={searchSubmit}> <i className="fas fa-search" ></i></Link>


            </div>


        </form>
    );

    return (
        <div className=" search-container  ">
            {/* <Menu /> */}
            <div>{searchForm()}</div>
            <div

            >
                {searchedProducts(results)}
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Search;  