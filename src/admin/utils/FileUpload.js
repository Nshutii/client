import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import{ PlusOutlined} from '@ant-design/icons';
import Axios from 'axios';
const API = process.env.REACT_APP_API_URL;

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        Axios.post(`${API}/products/uploadImage`, formData, config)
            .then(response => {
                if (response.data.success) {

                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div className='fileUpload' >
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div className='fileUpload-image' 
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        
                        {/* <Icon type="plus" style={{ fontSize: '3rem' }} /> */}
                        <PlusOutlined style={{  fontSize: '27px' }} />

                    </div>
                )}
            </Dropzone>

            <div className='image-right' >

              {Images.map((image, index) => (
                    <div key={index} onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`${process.env.REACT_APP_API_URL}/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}

            </div>

        </div>
    )
}

export default FileUpload
