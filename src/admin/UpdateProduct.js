import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Typography, Button, Form, message, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import Icon from '@ant-design/icons';
import FileUpload from './utils/FileUpload'
import {
    //  Link,
 Redirect } from 'react-router-dom';
 import Menu from "../core/Menu"
import Footer from '../core/Footer'
import { getProduct, getCategories, updateProduct } from './apiAdmin';
import Axios from 'axios';

const API = process.env.REACT_APP_API_URL;
const { Title } = Typography;
const { TextArea } = Input;


const UpdateProduct = ( { match }) => {
    const [values, setValues] = useState({
        title: '',
        description: '',
        short_description: '',
        price: '',
        categories: [],
        category: '',
        brand: '',
        quantity: '',
        images: [],
        loading: false,
        error: false,
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
    const [categories, setCategories] = useState([]);
    const [Images, setImages] = useState([])

    const { user, token } = isAuthenticated();
    const {
        title,
        description,
        price,
        // categories,
        images,
         short_description,
        category,
        brand,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    title: data.title,
                    description: data.description,
                    short_description: data.short_description,
                    price: data.price,
                    images: data.images,
                    brand: data.brand,
                    category: data.category._id,
                    quantity: data.quantity,
                    formData: new FormData()
                });
                // load categories
                initCategories();
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = name => event => {
        const value = name === 'images' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateProduct(match.params.productId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    title: '',
                    description: '',
                    short_description: '',
                    images: [],
                    price: '',
                    brand: '',
                    quantity: '',
                    loading: false,
                    error: false,
                    redirectToProfile: true,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
 
         <div className="addProductPage">
            <div className="productForm" >
                <Form onSubmit={onSubmit} >
                     <FileUpload  onChange={handleChange('images')} refreshFunction={updateImages} accept="images/*"  value={images} />

      <div className="inputFields d-flex">
        <div className="col-md-6 col-sm-12">


                       <div className="productInput">
                                    <label>Name</label>
                                    <Input placeholder="Name"
                                        onChange={handleChange('title')}
                                        value={title}
                                    />

                                </div>

                                <div className="productInput">
                                    <label>Brand</label>
                                    <Input
                                        placeholder="Brand"
                                        onChange={handleChange('brand')}
                                        value={brand}
                                        type="text"
                                    />

                                </div>

                                <div className="productInput">
                                    <label>Price</label>
                                    <Input
                                       onChange={handleChange('price')}
                                        value={price}
                                        type="number"
                                    />

                                </div>
                                 <div className="productInput">
                                    <div className="productInput-category">
                                        <label>Category</label>
                                        <select onChange={handleChange('category')} className="form-control">
                                            <option>Please select</option>
                                            {categories &&
                                                categories.map((c, i) => (
                                                    <option key={i} value={c._id}>
                                                        {c.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
            </div>

                 <div className="col-md-6 col-sm-12">
                <div className="productInput">
                                    <label>Quantity</label>
                                    <Input
                                         onChange={handleChange('quantity')} 
                                        value={quantity}
                                        type="number"
                                    />

                                </div>
                                <div className="productInput">


                                    <label>Short Description</label>

                                    <textarea 
                                    style={{ width: '400px', height: '200px' }}
                                        onChange={handleChange('short_description')}
                                        value={short_description}

                                    >

                                    </textarea>


                                </div>
                                </div>
                    </div>
                </div>

                        <div className="addProduct">
                            <div className="des">

                                <label>Description</label>

                                <textarea
                                    onChange={handleChange('description')} 
                                    value={description}
                                ></textarea>
                            </div>
                            <div className="addProductBtn">

                                <button onClick={onSubmit}>Update Product</button>
                            </div>
                        </div>
        </Form>
        </div>
    </div>
      
      
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />;
            }
        }
    };

    return (
        <div >
          <Menu />
            {/* <div className="row"> */}
                
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
               
            {/* </div> */}
              <Footer />
        </div>
    );
};

export default UpdateProduct;