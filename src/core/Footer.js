import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { InstagramEmbed } from 'react-instagram-embed';
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
                <li><i className="fas fa-map-marker-alt"></i> <a href="https://www.google.com/maps/place/Kigali+Phones+Center+Ltd/@-1.945581,30.059201,13z/data=!4m8!1m2!2m1!1skigali+phone+center!3m4!1s0x19dca418b5e91917:0x2eb7395efbe5f85b!8m2!3d-1.9460244!4d30.0599452?hl=en-US" target="_blank"> KN 4 Ave, Kigali,centenary house 5th floor, Rwanda</a></li>
                <li><i className="fa fa-envelope"></i> <a href="mailto:kigaliphones@gmail.com"> kigaliphones@gmail.com</a></li>
                <li><i className="fab fa-whatsapp"></i>
                  <a href="https://wa.me/message/SJKXVM2EKVS7E1" target="_blank"> +250 727 311 429</a></li>
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
              <h3>Our Instagram Posts</h3>
              <div className="images overflow-auto">



              </div>

            </div>
          </div>
          <div className="social-info">
            <div className="social-networks">
              <a href="https://web.facebook.com/KigaliPhones/?_rdc=1&_rdr" target="_blank" title="Facebook" > <i className="fab fa-facebook-f" ></i></a>
              <a href="https://twitter.com/kigali_phones?lang=en" target="_blank" title="Twitter"><i className="fab fa-twitter" ></i></a>
              <a href="https://www.instagram.com/kigali_phones_center/" target="_blank" title="Instagram" ><i className="fab fa-instagram"></i></a>
              <a href="https://www.youtube.com/channel/UCdNqHf2DEMRlVIMJi5gfNIQ" target="_blank" title="YouTube"><i className="fab fa-youtube"></i></a>
            </div>
            <div className="owners">
              <p className="data">
                &copy; Kigali Phones Center - {date} - All Rights Reserved
        </p>
            </div>
            <div className="footer-copyright">

            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default Footer;
