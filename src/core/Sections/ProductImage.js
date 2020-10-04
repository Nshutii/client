import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
const API = process.env.REACT_APP_API_URL;

const ProductImage = (props) => {
    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = [];

            props.detail.images && props.detail.images.map(item => {
                images.push({
                    original: `${API}/${item}`,
                    thumbnail: `${API}/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ProductImage
