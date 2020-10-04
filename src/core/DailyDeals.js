import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';
import Menu from './Menu'

const DailyDeals = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = items => {
    return (
      <div>
        <div className="Cart-header">

          <div className="Cart-title"> <h3>{`${items.length}`} Items</h3></div>
        </div>


        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  return (
    <div>
      <Menu />

      <div

        className="productCart"
      >

        <div className="row">
          <div className="col-6 border-0">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>

        </div>
      </div>
    </div>
  );
};

export default DailyDeals;