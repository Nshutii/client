import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "./UCard";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./data";

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <div>
            <Menu />

            <div className="shop-container ">
                <div className="row mt-5" >
                    <div className="col-lg-2 col-md-12 col-sm-12 mb-3 pl-2 catp">
                        <h4>Categories</h4>
                        <div className='check-list'>

                            <ul>
                                <Checkbox
                                    categories={categories}
                                    handleFilters={filters =>
                                        handleFilters(filters, "category")
                                    }
                                />
                            </ul>
                        </div>

                        <h4 >Price range</h4>
                        <div className='radio-list'>
                            <RadioBox
                                prices={prices}
                                handleFilters={filters =>
                                    handleFilters(filters, "price")
                                }
                            />
                        </div>
                    </div>

                    <div className="col-lg-10 col-md-9 col-sm-12">
                        <h2 className="mb-4 text-center">Products</h2>
                        <div className="row">
                            {filteredResults.map((product, i) => (
                                <div key={i} className="mb-3">
                                    <Card product={product} />
                                </div>
                            ))}
                        </div>
                        <hr />
                        {loadMoreButton()}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Shop;