import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './Tools/ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeWishlistItem } from './cartHelpers';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
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

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/wishlist" />;
    }
  };
  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} id='bt' className="btn btn-outline-secondary mt-2 mb-2">Add To Cart</button>
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
          <div className="wishPage-input-group">
           
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
            removeWishlistItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="wishPage-btns-remove"
        >
          x
        </button>
      )
    );
  };


  const renderWishlistImage = (images) => {
    if (images) {
      let image = images[0]
      return `${process.env.REACT_APP_API_URL}/${image}`
    }
  }


  return (

    <div id='bt' className=" wishPage">
      <div className="text-center wishPage-image">
        {shouldRedirect(redirect)}
        {/* <ShowImage item={product} url='product' /> */}
        <Link to={`/product/${product._id}`} className="mr-2">
          <img style={{ width: '70px' }} alt="product" src={renderWishlistImage(product.images)} />
        </Link>
      </div>
      <div className=" wishPage-title">

         <Link className=" text-center" to={`/product/${product._id}`}>
            {product.title}
          </Link>
      </div>
      <div className='wishPage-buttons'>

        <div className='wishPage-btnAdd '>

          {/* {showViewButton(showViewProductButton)} */}
          {showAddToCart(showAddToCartButton)}
           <span className='wishPage-btns-remov'>
              {showRemoveButton(showRemoveProductButton)}
               </span>
          {/* <div className=' wishPage-buttons-btns'>

            <div className='wishPage-btns-update'>

              {showCartUpdateOptions(cartUpdate)}
            </div>
            <div className='wishPage-btns-remov'>

              {showRemoveButton(showRemoveProductButton)}
            </div>
          </div> */}
        </div>
      </div>

    </div>

  );
};

export default Card;