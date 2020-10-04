import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'
import { Col, Card, Row, Button } from 'antd';
import Icon from '@ant-design/icons';
import ShowImage from './Tools/ShowImage';
import { categories, price } from './Tools/Datas';
// import SearchFeature from './Sections/SearchFeature';
import { addItem } from './cartHelpers';
import { getProducts } from './apiCore';
import Menu from './Menu'
import Footer from './Footer'

import { brands, watches } from "./data";
import img1 from '../img/phone1.jpg'
import img2 from '../img/phone2.jpg'
// import img3 from '../img/phone3.jpg'
import img4 from '../img/a.jpg'
import img5 from '../img/b.jpg'
import img6 from '../img/c.jpg'
import img7 from '../img/e.jpg'
import img8 from '../img/e.jpg'
import img9 from '../img/f.jpg'

const API = process.env.REACT_APP_API_URL;

const { Meta } = Card;

const Home = (props) => {

  const [Products, setProducts] = useState([])
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [PostSize, setPostSize] = useState()
  const [SearchTerms, setSearchTerms] = useState("")

  const [Filters, setFilters] = useState({
    categories: [],
    price: []
  })
  const [Product, setProduct] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [productsBySell, setProductsBySell] = useState([]);
  const [error, setError] = useState(false);



  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  const loadProductsBySell = () => {
    getProducts('price').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };


  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival();
    const variables = {
      skip: Skip,
      limit: Limit,
    }

    getProducts(variables)

  }, [])


  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filters,
      searchTerm: SearchTerms
    }
    getProducts(variables)
    setSkip(skip)
  }

  const renderCardByArrival = productsByArrival.map((product, index) => {



    const addToCart = () => {
      addItem(product, setRedirect(true));
      console.log('added');
    };
    return <div key={index} className="daily-product">


      <Link to="" className="daily-product-category">Speakers</Link>
      <div className="product-info-container">

        <div className="daily-product-description">
          <Link to={`/product/${product._id}`}>
            {product.title}
          </Link>
        </div>
        <div className="product-image">
          <Link to={`/product/${product._id}`}>
            <ShowImage images={product.images} />
          </Link>
        </div>
        <div className="price-container">
          <div className="view-price"><span>{`Rwf ${product.price}`}</span></div>
          <button onClick={addToCart} className="add-to-cart"><i className="fas fa-cart-plus"></i></button>
        </div>

      </div>
      <div className="hover-container">
        <div className="add-to-compare">
          <a href=""><i className="fas fa-sync-alt"></i>Compare</a>
        </div>
        <div className="add-to-wishlist">
          <a href=""><i className="far fa-heart"></i>WishList</a>
        </div>
      </div>

    </div>

  })


  const renderCardBySell = productsBySell.map((product, index) => {
    const addToCart = () => {
      addItem(product, setRedirect(true));
      console.log('added');
    };

    return <div key={index} className="product-item">
      <div className="product-image">
        <Link to={`/product/${product._id}`}>
          <ShowImage images={product.images} />
        </Link>
      </div>

      <div className="product-description">
        <div className="product-border">
          <div className="product-category">

            <Link to="" >Speakers</Link>
          </div>
          <div className="product-name">
            <Link to={`/product/${product._id}`}>
              {product.title}
            </Link>          </div>

          <div className="price-container">
            <div className="view-price"><span>{`Rwf ${product.price}`}</span></div>
            <button onClick={addToCart} className="add-to-cart"><i className="fas fa-cart-plus"></i></button>
          </div>
        </div>

        <div className="hover-container">
          <div className="add-to-compare">
            <Link to=""><i className="fas fa-sync-alt"></i>Compare</Link>
          </div>
          <div className="add-to-wishlist">
            <Link to=""><i className="far fa-heart"></i>WishList</Link>
          </div>
        </div>
      </div>



    </div>

  })




  const showFilteredResults = (filters) => {

    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters

    }
    getProducts(variables)
    setSkip(0)

  }

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {

      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    console.log('array', array)
    return array
  }

  const handleFilters = (filters, category) => {

    const newFilters = { ...Filters }

    newFilters[category] = filters

    if (category === "price") {
      let priceValues = handlePrice(filters)
      newFilters[category] = priceValues

    }

    console.log(newFilters)

    showFilteredResults(newFilters)
    setFilters(newFilters)
  }

  const updateSearchTerms = (newSearchTerm) => {

    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm
    }

    setSkip(0)
    setSearchTerms(newSearchTerm)

    getProducts(variables)
  }


  return (
    <div>
      <a id="button" title="Back To Top"></a>
      <Menu />
      <div className="main-home">

        <section className="categories">
          <h2><i className="fas fa-bars"></i>Categories</h2>
          <ul className="main-home-categories">
            <li><a href="#">Phones & Tablets</a>
              <ul className="sub-categories">
                <span>
                  <h4>Phones</h4>
                  {brands.map((brand, i) => (

                    <li key={i}><a href="">{brand}</a></li>
                  ))}

                </span>

              </ul>
            </li>
            <li><a href="#">Smart Watches</a>
              <ul className="sub-categories">
                <span>
                  <h4>Watches</h4>
                  {watches.map((watch, i) => (

                    <li key={i}><a href="">{watch}</a></li>
                  ))}
                </span>
                <span>
                  <h4>New Arrivals</h4>
                  {watches.map((watch, i) => (

                    <li key={i}><a href="">{watch}</a></li>
                  ))}
                </span>
                <span>
                  <h4>Hot Brands</h4>
                  {watches.map((watch, i) => (

                    <li key={i}><a href="">{watch}</a></li>
                  ))}
                </span>
              </ul>
            </li>
            <li><a href="#">Smart Televisions</a>
              <ul className="sub-categories">
                <span>
                  <h4>Phones</h4>
                  {brands.map((brand, i) => (

                    <li key={i}><a href="">{brand}</a></li>
                  ))}

                </span>
                <span>
                  <h4>New Arrivals</h4>
                  {brands.map((brand, i) => (

                    <li key={i}><a href="">{brand}</a></li>
                  ))}
                </span>
                <span>
                  <h4>Hot Brands</h4>
                  {brands.map((brand, i) => (

                    <li key={i}><a href="">{brand}</a></li>
                  ))}
                </span>
              </ul>
            </li>
            <li><a href="#">Phones & Tablets Accessories</a>

              <ul className="sub-categories">
                <span>
                  <h4>Phones</h4>
                  {brands.map((brand, i) => (

                    <li key={i}><a href="">{brand}</a></li>
                  ))}

                </span>
                <span>
                  <h4>New Arrivals</h4>
                  {brands.map((brand, i) => (

                    <li key={i}><a href="">{brand}</a></li>
                  ))}
                </span>
                <span>
                  <h4>Hot Brands</h4>
                  {brands.map((brand, i) => (

                    <li key={i}><a href="">{brand}</a></li>
                  ))}
                </span>
              </ul>
            </li>
            <li><a href="#">Smart Televisions Accessories</a>

              <ul className="sub-categories">
                <span>
                  <h4>Phones</h4>
                  {brands.map((brand, i) => (

                    <li key={i}><a href="">{brand}</a></li>
                  ))}

                </span>
                <span>
                  <h4>New Arrivals</h4>
                  {brands.map((brand, i) => (

                    <li key={i}><a href="">{brand}</a></li>
                  ))}
                </span>
                <span>
                  <h4>Hot Brands</h4>
                  {brands.map((brand, i) => (

                    <li key={i}><a href="">{brand}</a></li>
                  ))}
                </span>
              </ul>
            </li>
          </ul>
          <a href=""><div className="other-ad"></div></a>
        </section>
        <section className='slider-info'>
          <div className="slider-container">
            <div className="slider">

              <a href="https://www.google.com/" className="slide current"><img src={img4} alt="" /></a>
              <a href="https://www.twitter.com/" className="slide"><img src={img5} alt="" /></a>
              <a href="https://www.amazon.com/" className="slide"><img src={img6} alt="" /></a>
              <a href="https://www.youtube.com/" className="slide"><img src={img7} alt="" /></a>
              <a href="https://www.netflix.com/" className="slide"><img src={img8} alt="" /></a>
              <a href="https://www.quora.com/" className="slide"><img src={img9} alt="" /></a>


            </div>
            <div className="buttons">
              <button id="prev"><i className="fas fa-arrow-left"></i></button>
              <button id="next"><i className="fas fa-arrow-right"></i></button>
            </div>
          </div>
          <div className="other-categories">
            <div className="other-menu1">
              <a href="https://www.google.com/"><img src={img1} alt="" /></a>
            </div>
            <div className="other-menu2">
              <a href="https://www.youtube.com/"><img src={img2} alt="" /></a>

            </div>
            <div className="other-menu3">
              <a href="https://www.amazon.com/"><img src={img1} alt="" /></a>

            </div>

          </div>
        </section>
        <section className="ads-bar">
          <a href=""><div className="ad1"></div></a>
          <a href=""><div className="ad2"></div></a>
        </section>
      </div>
      <div className="new-arrivals">
        <div className="arrivals-header">

          <div className="arrivals-title"> <h3>New Arrivals</h3></div>
        </div>
        <div className="new-products-container">

          {renderCardByArrival}



        </div>

      </div>
      <section className="best-sellers">
        <div className="mytabs">
          <div className="sellers-title">
            <h3>Best Sellers</h3>
          </div>
          <input type="radio" name="mytabs" id="tvs" />
          <label htmlFor="tvs">Televisions</label>

          <input type="radio" name="mytabs" id="watches" />
          <label htmlFor="watches">Watches</label>


          <input type="radio" name="mytabs" id="accessories" />
          <label htmlFor="accessories">Accessories</label>

          <input type="radio" name="mytabs" id="phones" defaultChecked="checked" />
          <label htmlFor="phones">Phones & Tablets</label>


          <div className="tab">
            <div className="content-container">
              {renderCardBySell}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>

  )
};

export default Home;