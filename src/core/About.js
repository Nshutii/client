import React from 'react';
import Menu from './Menu';
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
import img1 from '../img/4.jpg'
import img2 from '../img/4.jpg'
import img3 from '../img/4.jpg'
import img4 from '../img/3.jpg'
import ceo from '../img/ceo.jpg'
import cto from '../img/cto.jpg'
const About = () => {
  return (
    <div>

      <Menu />

      <div className="about-header">
        <h3>About Us</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, voluptate velit! Sed officiis nulla dignissimos non. Nam recusandae sed dignissimos quis maiores doloribus, officia blanditiis animi culpa eius aut eum.</p>
      </div>

      <div className="about-info">
        <div className="about-info-card">
          <div className="info-image"><img src={img1} alt="" /></div>
          <h5>History of Beginning ?</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis debitis voluptas magni, quis aut quibusdam quasi quam est exercitationem aliquid libero error accusantium ullam fugit et quae quod? Voluptatibus, reiciendis.</p>
        </div>
        <div className="about-info-card">
          <div className="info-image"><img src={img3} alt="" /></div>
          <h5>What we really do?</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis debitis voluptas magni, quis aut quibusdam quasi quam est exercitationem aliquid libero error accusantium ullam fugit et quae quod? Voluptatibus, reiciendis.</p>
        </div>
        <div className="about-info-card">
          <div className="info-image"><img src={img2} alt="" /></div>
          <h5>Our Vision ?</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis debitis voluptas magni, quis aut quibusdam quasi quam est exercitationem aliquid libero error accusantium ullam fugit et quae quod? Voluptatibus, reiciendis.</p>
        </div>
      </div>

      <div className="who-we-are">
        <div className="content">
          <h2>Who We Are</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus aperiam voluptates fugiat, ullam incidunt quasi obcaecati eveniet, neque ipsum maxime expedita, alias placeat deserunt! Architecto optio rerum eos maxime nulla tenetur doloribus quasi ullam quam cumque dolorum, fuga, temporibus magnam!
    </p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At voluptatum similique nam fugiat doloremque totam aut earum eligendi impedit eius necessitatibus dolorum illum est, facilis alias ducimus beatae, voluptate ullam atque vel illo id. Dicta fuga ipsa a nisi illum, ratione nulla. Itaque voluptas tempora consequuntur! Necessitatibus similique voluptatibus cum impedit ullam culpa, doloremque nam perferendis, accusamus dignissimos molestiae tempore?</p>
        </div>
        <div className="image"><img src={img4} alt="" /></div>

      </div>

      <div className="our-services">

        <div className="our-services-header">
          <h3>Our Services</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dolor illo sed magnam, qui excepturi reiciendis alias dolore deleniti? Fuga.</p>
        </div>
        <div className="services">
          <div className="service">
            <div className="icon"> <i className="fas fa-mobile"></i></div>
            <h5>We Sell SmartPhones</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate omnis consequuntur corrupti laborum, magnam nisi mollitia consectetur accusantium fugit iste pariatur porro alias optio ab doloremque ipsam deserunt dicta! Deleniti non quam quibusdam, obcaecati modi maxime! Odit nesciunt amet vero.</p>
          </div>
          <div className="service">
            <div className="icon"><i className="fas fa-tv"></i></div>
            <h5>We Sell Televisions</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate omnis consequuntur corrupti laborum, magnam nisi mollitia consectetur accusantium fugit iste pariatur porro alias optio ab doloremque ipsam deserunt dicta! Deleniti non quam quibusdam, obcaecati modi maxime! Odit nesciunt amet vero.</p>
          </div>
          <div className="service">
            <div className="icon"> <i className="fas fa-mobile"></i></div>
            <h5>We Sell Accessories</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate omnis consequuntur corrupti laborum, magnam nisi mollitia consectetur accusantium fugit iste pariatur porro alias optio ab doloremque ipsam deserunt dicta! Deleniti non quam quibusdam, obcaecati modi maxime! Odit nesciunt amet vero.</p>
          </div>
          <div className="service">
            <div className="icon"> <i className="fas fa-tools"></i></div>
            <h5>We repair Phones & TVs</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate omnis consequuntur corrupti laborum, magnam nisi mollitia consectetur accusantium fugit iste pariatur porro alias optio ab doloremque ipsam deserunt dicta! Deleniti non quam quibusdam, obcaecati modi maxime! Odit nesciunt amet vero.</p>
          </div>
          <div className="service">
            <div className="icon"> <i className="fas fa-mobile"></i></div>
            <h5>We Sell Phone Accessories</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate omnis consequuntur corrupti laborum, magnam nisi mollitia consectetur accusantium fugit iste pariatur porro alias optio ab doloremque ipsam deserunt dicta! Deleniti non quam quibusdam, obcaecati modi maxime! Odit nesciunt amet vero.</p>
          </div>
          <div className="service">
            <div className="icon"><i className="far fa-keyboard"></i></div>
            <h5>We Sell TVs Accessories</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate omnis consequuntur corrupti laborum, magnam nisi mollitia consectetur accusantium fugit iste pariatur porro alias optio ab doloremque ipsam deserunt dicta! Deleniti non quam quibusdam, obcaecati modi maxime! Odit nesciunt amet vero.</p>
          </div>
        </div>
      </div>

      <div className="team">
        <h3>Meet Our Team Members</h3>
        <div className="member-profiles">
          <div className="member-profile">
            <div><img src={ceo} alt="" /></div>
            <h5>CO-FOUNDER/CEO</h5>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda minus mollitia numquam quis quibusdam accusantium perspiciatis, sed debitis itaque ex velit repellat, non consequatur dolorum cum nulla pariatur. Placeat sit expedita qui dolorum reiciendis maxime! Sed saepe, voluptate ipsam est deleniti, ratione porro ut nisi fuga alias laborum quis quibusdam.</p>


            <div className="social-media-icons">
              <h5>Connect with us</h5>
              <div className="social-networks">

                <a href="https://twitter.com/ndiisanze" target="_blank" title="Twitter"><i className="fab fa-twitter" ></i></a>
                <a href="https://www.instagram.com/ndiisanze/" target="_blank" title="Instagram" ><i className="fab fa-instagram"></i></a>

              </div>
            </div>
          </div>
          <div className="member-profile">
            <div><img src={cto} alt="" /></div>
            <h5>CO-FOUNDER/CEO</h5>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda minus mollitia numquam quis quibusdam accusantium perspiciatis, sed debitis itaque ex velit repellat, non consequatur dolorum cum nulla pariatur. Placeat sit expedita qui dolorum reiciendis maxime! Sed saepe, voluptate ipsam est deleniti, ratione porro ut nisi fuga alias laborum quis quibusdam.</p>


            <div className="social-media-icons">
              <h5>Connect with us</h5>
              <div className="social-networks">

                <Link to="https://twitter.com/ndiisanze" target="_blank" title="Twitter"><i className="fab fa-twitter" ></i></Link>
                <Link to="https://www.instagram.com/ndiisanze/" target="_blank" title="Instagram" ><i className="fab fa-instagram"></i></Link>

              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default About
