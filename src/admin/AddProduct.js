import React, { useEffect, useState } from 'react'
import { Typography, Button, Form, message, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import Icon from '@ant-design/icons';
import FileUpload from './utils/FileUpload'
import Menu from "../core/Menu"
import Navbar from '../core/Navbar';
import Footer from '../core/Footer'
import { getCategories } from './apiAdmin';
import Axios from 'axios';
const API = process.env.REACT_APP_API_URL;

const { Title } = Typography;
const { TextArea } = Input;




const AddProduct = (props) => {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [BrandValue, setBrandValue] = useState('')
    const [Short_description, setShort_descriptionValue] = useState('')

    const [QuantityValue, setQuantityValue] = useState(0)
    // const [CategoryValue, setCategoryValue] = useState(1)

    const [Images, setImages] = useState([])
    const [CategoryValue, setCategoryValue] = useState({ categories: [], category: '', formData: '' });
    const {
        categories,
        category,
        formData
    } = CategoryValue;

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setCategoryValue({ ...CategoryValue, error: data.error });
            } else {
                setCategoryValue({
                    ...CategoryValue,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }
    const onShort_descriptionChange = (event) => {
        setShort_descriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }
    const onBrandChange = (event) => {
        setBrandValue(event.currentTarget.value)
    }

    const onQuantityChange = (event) => {
        setQuantityValue(event.currentTarget.value)
    }


    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setCategoryValue({ ...CategoryValue, [name]: value });
    };
    const onCategoriesSelectChange = (e) => {
        //  const value = e.currentTarget.value;
        setCategoryValue(e.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }


    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !PriceValue || !QuantityValue ||
            !CategoryValue || !Images) {
            toast.error('fill all the fields first!')
        }

        const variables = {
            title: TitleValue,
            description: DescriptionValue,
            images: Images,
            price: PriceValue,
            brand: BrandValue,
            short_description: Short_description,
            quantity: QuantityValue,
            category: category,
        }

        Axios.post(`${API}/product/create`, variables, formData)
            .then(response => {
                if (response.data.success) {
                    toast.success('Product Successfully Uploaded')
                    props.history.push('/')
                } else {
                    toast.error('Failed to upload Product')
                }
            })

    }




    return (
        <div>
            <Menu />


            <div className="addProductPage">


                <div className="productForm" >



                    <Form onSubmit={onSubmit} >

                        {/* DropZone */}
                        <FileUpload refreshFunction={updateImages} />
                        <div className="inputFields">


                            <div >
                                <div className="productInput">
                                    <label>Name</label>
                                    <Input placeholder="Name"
                                        onChange={onTitleChange}
                                        value={TitleValue}
                                    />

                                </div>
                                <div className="productInput">
                                    <label>Brand</label>
                                    <Input
                                        placeholder="Brand"
                                        onChange={onBrandChange}
                                        value={BrandValue}
                                        type="text"
                                    />

                                </div>

                                <div className="productInput">
                                    <label>Price</label>
                                    <Input
                                        onChange={onPriceChange}
                                        value={PriceValue}
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



                            </div>
                            <div >



                                <div className="productInput">
                                    <label>Quantity</label>
                                    <Input
                                        onChange={onQuantityChange}
                                        value={QuantityValue}
                                        type="number"
                                    />

                                </div>
                                <div className="productInput">


                                    <label>Short Description</label>

                                    <textarea style={{ width: '400px', height: '200px' }}
                                        onChange={onShort_descriptionChange}
                                        value={Short_description}
                                    ></textarea>


                                </div>


                            </div>

                        </div>

                        <div className="addProduct">
                            <div className="des">

                                <label>Description</label>

                                <textarea
                                    onChange={onDescriptionChange}
                                    value={DescriptionValue}
                                ></textarea>
                            </div>
                            <div className="addProductBtn">

                                <button onClick={onSubmit} >Add Product</button>
                            </div>
                        </div>
                    </Form>

                </div>

                <Footer />
            </div>
        </div >
    )
}

export default AddProduct;
