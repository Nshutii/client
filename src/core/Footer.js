import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import img1 from '../img/1.jpg'
import img2 from '../img/2.jpg'
import ceo from '../img/ceo.jpg'
import cto from '../img/cto.jpg'

const Footer = () => {

  const [date, setDate] = useState();

  const getYear = () => setDate(new Date().getFullYear());

  useEffect(() => {
    getYear();
  }, [])

  return (
    <div >

      <section className="footer">
        <div className="info">
          <div className="Container">
            <div className="kpc-info">
              <h3>Kigali Phones Center</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, eaque aut saepe temporibus tempora nulla! Sapiente ipsa hic suscipit culpa!</p>
              <ul className="address">
                <li><i className="fas fa-map-marker-alt"></i> 23 Street, Nyarugenge, Kigali, Rwanda</li>
                <li><i className="fa fa-envelope"></i> kigaliphones@gmail.com</li>
                <li><i className="fas fa-mobile-alt"></i> +250 788 789 665</li>
              </ul>
            </div>
            <div className="useful-links">
              <h3>Useful Links</h3>
              <ul className="links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/wishlist">WishList</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/signin">Login</Link></li>
                <li><Link to="/signup">Register</Link></li>
              </ul>
            </div>
            {/* <div className="find-it-quick">
              <h3>Find It Quick</h3>
              <ul className="links">
                <li><Link to="#">Smart Phones & Tablets</Link></li>
                <li><Link to="#">Televisions</Link></li>
                <li><Link to="#">Watches</Link></li>
                <li><Link to="#">Accessories</Link></li>
                <li><Link to="#">Daily Deals</Link></li>
                <li><Link to="#">New Arrivals</Link></li>
              </ul>
            </div> */}
            <div className="insta-posts">
              <h3>Our Instagram Latest Posts</h3>
              {/* <div className="images"> */}
              {/* <div className="image">

                  <Link to="" ><img src={cto} alt="" /> <i className="fab fa-instagram"></i></Link>
                </div>
                <div className="image">

                  <Link to="" ><img src={ceo} alt="" /> <i className="fab fa-instagram"></i></Link>
                </div>
                <div className="image">

                  <Link to="" ><img src={cto} alt="" /> <i className="fab fa-instagram"></i></Link>
                </div>
                <div className="image">

                  <Link to="" ><img src={ceo} alt="" /> <i className="fab fa-instagram"></i></Link>
                </div>
                <div className="image">

                  <Link to="" ><img src={cto} alt="" /> <i className="fab fa-instagram"></i></Link>
                </div>
                <div className="image">

                  <Link to="" ><img src={cto} alt="" /> <i className="fab fa-instagram"></i></Link>
                </div>
                <div className="image">

                  <Link to="" ><img src={ceo} alt="" /> <i className="fab fa-instagram"></i></Link>
                </div>
                <div className="image">

                  <Link to="" ><img src={cto} alt="" /> <i className="fab fa-instagram"></i></Link>
                </div>

               */}


              {/* </div> */}
              <div className="powr-instagram-feed" id="0f360dc5_1600678726"></div>
              <script src="https://www.powr.io/powr.js?platform=react"></script>
            </div>
          </div>
          <div className="social-info">
            <div className="social-networks">
              <Link to="https://web.facebook.com/KigaliPhones/?_rdc=1&_rdr" target="_blank" title="Facebook" > <i className="fab fa-facebook-f" ></i></Link>
              <Link to="https://twitter.com/kigali_phones?lang=en" target="_blank" title="Twitter"><i className="fab fa-twitter" ></i></Link>
              <Link to="https://www.instagram.com/kigali_phones_center/" target="_blank" title="Instagram" ><i className="fab fa-instagram"></i></Link>
              <Link to="https://www.youtube.com/channel/UCdNqHf2DEMRlVIMJi5gfNIQ" target="_blank" title="YouTube"><i className="fab fa-youtube"></i></Link>
            </div>
            <div className="owners">
              <p className="data">
                &copy; Kigali Phones Center - {date} - All Rights Reserved
        </p>
            </div>


          </div>
        </div>
      </section>

    </div>
  )
}

export default Footer;
