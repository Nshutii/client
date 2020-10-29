import React, { Fragment } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
// import Mailto from 'react-mailto';
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import img1 from '../img/11.2 shopping-bag.svg.svg';
import img2 from '../img/shopping-cart.svg';
import Search from './Search'
import logo from '../img/logo.jpg'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#7c7c7c" };
    }
};

const Menu = ({ history }) =>{
     const refreshPage = () => {
    window.location.reload(false);
    window.location.pathname = '/'
   
  } 
     const refreshAboutPage = () => {
    window.location.reload(false);
    window.location.pathname = '/about'
   
  } 
     const refreshFaqPage = () => {
    window.location.reload(false);
    window.location.pathname = '/faq'
   
  } 
     const refreshContactPage = () => {
    window.location.reload(false);
    window.location.pathname = '/contact'
   
  } 

  

 
  
return (
    
   <div className="what">
        <div className="fix">

            <a href="https://wa.me/message/SJKXVM2EKVS7E1" target="_blank" title="Contact Us"><i className="fab fa-whatsapp"></i></a>
        </div>
        <div className="horizontal-line">
            <div className="containerNav">



                <header>
                    <section className="header-info">
                        <div className="header-info-text">
                            <ul>
                                
                                
                                <li><i className="fab fa-whatsapp"></i>
                                 <a href="https://wa.me/message/SJKXVM2EKVS7E1" target="_blank">+250 727 311 429</a></li>

                                <li><i className="far fa-envelope"></i>
                                
                                  <a href="mailto:kigaliphones@gmail.com" >
                                
                                kigaliphones@gmail.com
                                
                                 </a>
                                
                                </li>
                                
                                <li><Link to="/" onClick={refreshPage}><img src={logo} alt=""/></Link></li>
                            </ul>
                        </div>
                        <div className="header-info-list">
                            <ul>

                                <li>

                                    <Link
                                        style={isActive(history, "/about")}
                                        to="/about"
                                        onClick={refreshAboutPage}
                                    >
                                        <i className="far fa-address-card"></i>


                                        About Us
                    </Link>


                                </li>

                                <li>

                                    <Link

                                        style={isActive(history, "/faq")}
                                        to="/faq"
                                         onClick={refreshFaqPage}
                                    >
                                        <i className="far fa-address-book"></i>


                                        FAQ
                    </Link>


                                </li>

                                <li>

                                    <Link

                                        style={isActive(history, "/contact")}
                                        to="/contact"
                                         onClick={refreshContactPage}
                                    >
                                        <i className="fas fa-mobile-alt"></i>


                                        Contact Us
                    </Link>


                                </li>





                                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                                    <li>
                                        <Link

                                            style={isActive(history, "/user/dashboard")}
                                            to="/user/dashboard"

                                        >
                                            <i className="far fa-user"></i> Account
                    </Link>
                                    </li>
                                )}

                                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                                    <li>
                                        <Link

                                            style={isActive(history, "/admin/dashboard")}
                                            to="/admin/dashboard"
                                        >
                                            <i className="far fa-user"></i> Account
                    </Link>
                                    </li>
                                )}

                                {!isAuthenticated() && (
                                    <Fragment>


                                        <li>
                                            <Link

                                                style={isActive(history, "/signup")}
                                                to="/signup"
                                            >
                                                <i className="far fa-user"></i> Register
                                             </Link>
                                            <span className="or">or</span>
                                            <Link

                                                style={isActive(history, "/signin")}
                                                to="/signin"
                                            >
                                                Login
                                             </Link>
                                        </li>
                                    </Fragment>
                                )}

                                {isAuthenticated() && (
                                    <li>
                                        <span
                                            className=" text-dark mb-2"
                                            style={{ cursor: "pointer", color: "#ffffff" }}
                                            onClick={() =>
                                                signout(() => {
                                                    history.push("/");
                                                })
                                            }
                                        >
                                            <i className="fas fa-sign-out-alt"></i> Logout
                    </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </section>
                </header>

            </div>


        </div>
        <div className="content-wrapper">
            <nav className="navigation">
                                    

                <div className="navigation-logo">
                    <Link to='/'  onClick={refreshPage} >

                       <img   src={logo} alt=""/>
        
         
                    </Link>
                </div>


                <Search />

                <div className="navigation-links">


                    <ul className="icons">
                        <li>  <Link to="/" >Home</Link> </li>
                        {/* <li>  <Link to="/" onClick={refreshPage}>Home</Link> </li>  */}
                      <li>  <Link title="Shop"
                            style={isActive(history, "/shop")}
                            to="/shop" > <img src={img1} alt="" /></Link> </li>
                        <li> <Link to="/wishlist" title="WishList"><i className="far fa-heart"></i></Link></li>


                        <li>
                            <Link

                                style={isActive(history, "/cart")}
                                to="/cart"
                                title="Cart"
                            >
                                <img src={img2} alt="" />
                                
                                <sup> <span className='item-count '>{itemTotal()}</span></sup>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
);
}
export default withRouter(Menu);