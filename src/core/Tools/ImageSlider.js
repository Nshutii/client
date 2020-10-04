import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import img5 from '../../img/b.jpg'
import img6 from '../../img/c.jpg'
import img7 from '../../img/e.jpg'
import img8 from '../../img/e.jpg'
import img9 from '../../img/f.jpg'

const ImageSlider = (props) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
            <Link to="/">
                <img

                    className="d-block w-100"
                    src={img7}
                    alt="First slide"
                />
                 </Link>
            </Carousel.Item>
            <Carousel.Item>
             <Link to="/">
                <img
                    className="d-block w-100"
                    src={img8}
                    alt="Second slide"
                />
             </Link>
               
            </Carousel.Item>
            <Carousel.Item>
             <Link to="/">
                <img
                    className="d-block w-100"
                    src={img7}
                    alt="Third slide"
                />
                 </Link>
              
            </Carousel.Item>
            <Carousel.Item>
             <Link to="/">
                <img
                    className="d-block w-100"
                    src={img7}
                    alt="Third slide"
                />

              </Link>
            </Carousel.Item>
        </Carousel>
    );
}


export default ImageSlider
