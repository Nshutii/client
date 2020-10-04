import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getWishlist } from './cartHelpers';
import Card from './wishCard';
import Checkout from './Checkout';
import Menu from './Menu';
import Footer from './Footer';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getWishlist());
    }, [run]);

    const showItems = items => {
        return (
            <div className='row'>
                {/* <div className="Cart-header">

                    <div className="Cart-title"> <h3>You Have {`${items.length}`} Items In Your Cart</h3></div>
                </div> */}


                {items.map((product, i) => (
                    <div key={i} className=" col-md-4 col-sm-12 mb-3">
                        <Card

                            product={product}
                            showAddToCartButton={true}
                            cartUpdate={false}
                            showRemoveProductButton={true}
                            setRun={setRun}
                            run={run}
                        />
                    </div>
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <div className="noItemsMessage">

            <h2>
                Your WishList is empty. <br /> <Link to="/shop">Update your WishList shopping</Link>
            </h2>
        </div>
    );

    return (
        <div>
            <Menu />

            <div className="productCart">

                <div className="productCart-row">
                    <div className="wish-item">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;