import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './Tools/ShowImage';
import moment from 'moment';
import { addItem,addWishlistItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  showAddToWishlistButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize

}) => {

  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button id='bt' className="btn btn-outline-success mt-2 mb-2 card-btn-1">View Product</button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };
  const addToWishlist = () => {
    // console.log('added');
    addWishlistItem(product, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const shouldWishlistRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/wishlist" />;
    }
  };
  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} id='bt' className="btn btn-outline-secondary mt-2 mb-2">Add to cart</button>
      )
    );
  };
  const showAddToWishlist = showAddToWishlistButton => {
    return (
      showAddToWishlistButton && (
        <button onClick={addToWishlist} id='bt'
         className="btn btn-outline-secondary mt-2 mb-2">Add to WishList</button>
      )
    );
  };



  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
        <span className="badge badge-primary badge-pill">Out of Stock </span>
      );
  };

  const handleChange = productId => e => {
    setRun(!run); // run useEffect in parent Cart
    setCount(e.target.value < 1 ? 1 : e.target.value);
    if (e.target.value >= 1) {
      updateItem(productId, e.target.value);
    }
  }

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="uCard-btns-remove"
        >
          x
        </button>
      )
    );
  };


  const renderCartImage = (images) => {
    if (images) {
      let image = images[0]
      return `${process.env.REACT_APP_API_URL}/${image}`
    }
  }

  const addToDeals = (product) => {
    const container = document.querySelector('.product-info-container');
    // if (container.classList.contains('daily-deals')) {
    //   return;
    // }
    container.className += ' daily-deals';
  }


  return (

    <div id='bt' className=" product-card-container">
      {shouldRedirect(redirect)}

      <div className="product-image">
        <Link to={`/product/${product._id}`}>
          <img alt="product" src={renderCartImage(product.images)} />
        </Link>
      </div>

      <div className="product-description">
        <div className="product-border">
          <div className="product-category">

            <Link to="" >{product.brand}</Link>
          </div>
          <div className="product-name">
            <Link to={`/product/${product._id}`}>
              {product.title}
            </Link>
          </div>

          <div className="price-container">
            <div className="view-price"><span>{`Rwf ${product.price}`}</span></div>
            {/* <button onClick={addToCart} className="add-to-cart"><i className="fas fa-cart-plus"></i></button> */}
          </div>
        </div>
        <div className="hover-container">
          <div className="add-to-compare">
            <Link to="/cart" onClick={addToCart} title="Add to Cart"><i className="fas fa-cart-plus"></i>Cart</Link>
          </div>
          <div className="add-to-wishlist">
            <Link to="/wishlist" onClick={addToWishlist} title="Add to WishList"><i className="far fa-heart"></i>WishList</Link>
          </div>
        </div>
      </div>

    </div>



  );
};

export default Card;