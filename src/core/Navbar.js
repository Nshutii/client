import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import img1 from '../img/11.2 shopping-bag.svg.svg'
import Search from './Search'


const Navbar = ({ history }) => {
  return (
    <div className="content-wrapper">
      <nav className="navigation">
        <div className="navigation-logo">
          <Link to="/">

            <h3>KPC</h3>

          </Link>
        </div>


        <Search />

        <div className="navigation-links">



          <ul className="icons">

            <li> <Link to="/" title="WishList">Home</Link></li>
            <li> <Link to="/shop" >Shop</Link></li>
            <li> <Link to="/wishList" title="WishList"><i className="far fa-heart"></i></Link></li>


            <li>
              <Link

                // style={isActive(history, "/cart")}
                to="/cart"
              // title="Cart"
              >
                <img src={img1} alt="" />
                <sup> <span className='item-count '>{itemTotal()}</span></sup>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
