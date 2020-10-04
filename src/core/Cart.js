import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';
import Menu from './Menu';
import Footer from './Footer';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                {/* <div className="Cart-header">

                    <div className="Cart-title"> <h3>You Have {`${items.length}`} Items In Your Cart</h3></div>
                </div> */}


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

        <div className="noItemsMessage">

            <h2>
                Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
            </h2>
        </div>
    );

    return (
        <div>
            <Menu />

            <div className="productCart">

                <div className="productCart-row">
                    <div className="cart-details">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>

                    <div className="mt-5 checkout-info">

                        <Checkout products={items} setRun={setRun} run={run} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;