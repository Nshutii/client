import React, { useState, useEffect } from 'react';
import { getProducts, getClientToken, createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
import Card from './Card';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        phone: '',
        district: '',
        sector: '',
        cell: '',
        village: '',
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getClientToken(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
                setData({ ...data, error: data.error });
            } else {
                console.log(data);
                setData({ clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };
    const handlePhone = event => {
        setData({ ...data, phone: event.target.value });
    };
    const handleDistrict = event => {
        setData({ ...data, district: event.target.value });
    };
    const handleSector = event => {
        setData({ ...data, sector: event.target.value });
    };
    const handleCell = event => {
        setData({ ...data, cell: event.target.value });
    };
    const handleVillage = event => {
        setData({ ...data, village: event.target.value });
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
                <Link to="/signin">
                    <button id='btn-s' className="bTNs">Sign in to checkout</button>
                </Link>
            );
    };

    let deliveryAddress = data.address
    let phoneNumber = data.phone
    let deliveryDistrict = data.district
    let deliverySector = data.sector
    let deliveryCell = data.cell
    let deliveryVillage = data.village

    const buy = () => {
        setData({ loading: true });


        const createOrderData = {
            products: products,
            amount: getTotal(products),
            phone: phoneNumber,
            district: deliveryDistrict,
            sector: deliverySector,
            cell: deliveryCell,
            village: deliveryVillage,
            address: deliveryAddress
        };

        createOrder(userId, token, createOrderData)
            .then(response => {
                emptyCart(() => {
                    setRun(!run); // run useEffect in parent Cart
                    console.log('Order success and empty cart');
                    setData({
                        loading: false,
                        success: true
                    });
                });
            })
            .catch(error => {
                console.log(error);
                setData({ loading: false });
            });

    };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div className="deliveryInputs ">

                    <div className="deliverys mt-4">
                        <input onChange={handleDistrict} value={data.district} type="text" placeholder='District' />

                    </div>
                    <div className="deliverys mt-4">
                        <input onChange={handleSector} value={data.sector} type="text" placeholder='Sector' />

                    </div>
                    <div className="deliverys mt-4">
                        <input onChange={handleCell} value={data.cell} type="text" placeholder='Cell' />

                    </div>
                    <div className="deliverys mt-4">
                        <input onChange={handleVillage} value={data.village} type="text" placeholder='Village' />

                    </div>
                    <div className="deliverys mt-4">
                        <input onChange={handlePhone} value={data.phone} type="number" placeholder='Phone' />

                    </div>

                    <div className="deliveryTextarea">

                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>


                    <button onClick={buy} className="deliveryBtn mb-5">
                        Order Now
                    </button>
                </div>
            ) : null}
        </div>
    );

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thanks! Your Order Was Successful!
        </div>
    );

    const showLoading = loading => loading && <h2 className="text-warning">Loading...</h2>;

    return (
        <div>
            <h2>Total: Rwf {getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;