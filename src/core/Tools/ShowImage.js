import React from 'react'
// import Carousel from 'react-elastic-carousel';
const API = process.env.REACT_APP_API_URL;
const ShowImage = (props) => {
    return (
        <div>
            <img style={{ width: '100%', maxHeight: '290px' }}
                src={`${API}/${props.images[0]}`} alt="productImage" />
        </div>

    )
}

export default ShowImage
