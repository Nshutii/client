import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Link, Redirect } from 'react-router-dom';
import { addItem, addWishlistItem } from './cartHelpers';
import { read, listRelated } from './apiCore';
import Card from './UCard';
import img from '../img/kpc_3.jpg';
import Menu from './Menu'
import Footer from './Footer'

const API = process.env.REACT_APP_API_URL;

const Product = (props, { product }) => {

  const productId = props.match.params.productId
  const [Product, setProduct] = useState([])
  const [redirect, setRedirect] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };


  useEffect(() => {

    const productId = props.match.params.productId;
    Axios.get(`${API}/product/products_by_id?id=${productId}&type=single`)
      .then(response => {
        setProduct(response.data[0])
      })

    loadSingleProduct(productId);

  }, [props]);


  const addToCart = () => {
    addItem(Product, setRedirect(true));
    console.log('added');

    if (redirect) {
      return <Redirect to="/cart" />;
    }

  };

  const addToWishlist = () => {
    addWishlistItem(Product, setRedirect(true));
    console.log('added');

    if (redirect) {
      return <Redirect to="/cart" />;
    }

  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  return (
    <div>
      <Menu />
      <div className=" productPage">


        <div className=" productPage-sections " >
          <div className='sectionOne ' >
            <ProductImage detail={Product} />
          </div>
          <div className='sectionTwo  '>
            <ProductInfo
              detail={Product} />
            <div className="addToButtons">
              <div className="addToCart-button mb-3">
                <Link to='/cart' onClick={addToCart} id='bt'>Add to cart</Link>
              </div>
              <div className="addToWishlist-button">
                <Link to='/wishlist' onClick={addToWishlist} id='bt'>Add to Wishlist</Link>
              </div>

            </div>
          </div>
        </div>
        <div className="productPage-description ">
          <div className="description-header">
            <div className="description-title">  <h2>Product Description</h2> </div>
          </div>
          <p> {Product.description}</p>

        </div>

        <div className="relatedPart">
          <div className="relatedPart-header">
            <div className="relatedPart-title">  <h2>Related products</h2> </div>
          </div>
          <div className="relatedProducts related-container">

            {relatedProduct.map((p, i) => (
              <div key={i}>

                <Card className="card" product={p} />
              </div>
            ))}


          </div>
        </div>
      </div>
      <Footer />
    </div>
  )

};

export default Product;