import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './Tools/ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

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
      return <Redirect to="/cart" />;
    }
  };
  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} id='bt' className="btn btn-outline-secondary mt-2 mb-2">Add to cart</button>
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
          <div className="cartPage-input-group">
           
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
          className="cartPage-btns-remove"
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


  return (

    <div id='bt' className=" cartPage">
      <div className="text-center cartPage-image">
        {shouldRedirect(redirect)}
        {/* <ShowImage item={product} url='product' /> */}
        <Link to={`/product/${product._id}`} className="mr-2">
          <img style={{ width: '70px' }} alt="product" src={renderCartImage(product.images)} />
        </Link>
      </div>
      <div className=" cartPage-title">

        <h3 id='c' className=" text-center">{product.title}</h3>
      </div>
      <div className='cartPage-buttons'>

        <div className='cartPage-btnAdd '>

          {/* {showViewButton(showViewProductButton)} */}
          {showAddToCart(showAddToCartButton)}
          <div className=' cartPage-buttons-btns'>

            <div className='cartPage-btns-update'>

              {showCartUpdateOptions(cartUpdate)}
            </div>
            <div className='cartPage-btns-remov'>

              {showRemoveButton(showRemoveProductButton)}
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default Card;