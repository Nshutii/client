import React from "react";
import Menu from "../core/Menu";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const {
        user: { name, email, role }
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card ">

                <ul
                    // style={{ fontSize: '12px' }}
                    className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link text-warning" to="/create/category">
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link text-warning" to="/create/product">
                            Create Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link text-warning" to="/admin/orders">
                            View Orders
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link text-warning" to="/admin/products">
                            Manage Products
                        </Link>
                    </li>
                    {/* <li className="list-group-item">
                        <Link className="nav-link text-warning" to="/dailyDeals">
                            Daily deals
                        </Link>
                    </li> */}
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="card mb-5 ">
                <h3 className="card-header">User Information</h3>
                <ul
                    // style={{ fontSize: '12px' }}
                    className="list-group">
                    <li className="list-group-item font-weight-bold">{name}</li>
                    <li className="list-group-item font-italic">{email}</li>
                    {/* <li className="list-group-item">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li> */}
                </ul>
            </div>
        );
    };

    return (
        <div>
            <Menu />

            <div className="container mt-5">
                <div className="row ">
                    <div className="col-md-6 mb-4">{adminLinks()}</div>
                    <div className="col-md-6">{adminInfo()}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;