import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {
    listOrders,
    getStatusValues,
    updateOrderStatus
} from "./apiAdmin";
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 className="text-warning display-2">
                    Total orders: {orders.length}
                </h1>
            );
        } else {
            return <h1 className="text-warning">No orders</h1>;
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2 w-50">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        console.log("Update Order Status ");

        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );


    return (
        <Layout
            title="Orders"
            description={`Welcome ${user.name
                }, you can manage all the orders here`}
            className="container-fluid"
        >
            <div  className="row">
                <div  className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    {orders.map((o, oIndex) => {
                        return (
                            <div
                                className="mt-5"
                                key={oIndex}
                                style={{ border: ".5px solid #fed700" , padding: "2rem"}}
                                // style={{ borderBottom: "5px solid #fed700" }}
                            >
                                {/* <h2 className="mb-5">
                                    <span className="bg-waring">
                                        Order ID: {o._id}
                                    </span>
                                </h2> */}

                                <ul className="listGroup mb-2">
                                    <li className="list-group-item">
                                        {showStatus(o)}
                                    </li>
                                    {/* <li className="list-group-item">
                                        Transaction ID: {o.transaction_id}
                                    </li> */}
                                    <li className="list-items">
                                      -  Amount :   <span>Rwf {o.amount}</span> 
                                    </li>
                                    <li className="list-items">
                                      -  Ordered by :  <span>{o.user.name}</span>
                                    </li>
                                    <li className="list-items">
                                      -  Ordered on : {" "}
                                       <span> {moment(o.createdAt).fromNow()}</span>
                                    </li>
                                    <li className="list-items">
                                      -  Delivery District :  <span>{o.district}</span>
                                    </li>
                                    <li className="list-items">
                                      -  Delivery Phone Color :  <span>{o.color}</span>
                                    </li>
                                    <li className="list-items">
                                      -  Delivery Sector :  <span>{o.sector}</span>
                                    </li>
                                    <li className="list-items">
                                      -  Delivery Cell :  <span>{o.cell}</span>
                                    </li>
                                    <li className="list-items">
                                      -  Delivery Village :  <span>{o.village}</span>
                                    </li>
                                    <li className="list-items">
                                       - Delivery Phone :  (+250) <span>{o.phone}</span>
                                    </li>
                                    <li className="list-items">
                                       - Delivery address :  <span>{o.address}</span>
                                    </li>
                                </ul>

                                <h3 className="mt-4 mb-4 font-italic">
                                    Total products in the order:{" "}
                                    {o.products.length}
                                </h3>

                                {o.products.map((p, pIndex) => (
                                    <div
                                        className="mb-4"
                                        key={pIndex}
                                        style={{
                                            
                                            display: "flex",
                                            padding: "20px",
                                            border: "1px solid indigo"
                                        }}
                                    >

                                        {showInput("Product Title", p.title)}
                                        {showInput("Product Price [Rwf]", p.price)}
                                        {showInput("Product Total", p.count)}
                                        {showInput("Product Id", p._id)}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );


};

export default Orders;