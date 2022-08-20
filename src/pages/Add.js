import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import "../styles/add.css";



const Add = () => {
    const [inputValues, setInputValue] = useState({
        sku: "",
        name: "",
        price: "",
        productType: "DVD",

    });

    //handle submit updates

    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    }
    const saveBtn = {
        "text": "save",
        "function": null,
        "form": 'product_form'
    }

    const cancelBtn = {
        "text": "cancel",
        "function": () => goToHome(),
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValues, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
    }
    return <> <Header pageName="Add"
        button1={saveBtn}
        button2={cancelBtn} />
        <form id="product_form" onSubmit={handleSubmit}>
            <label>
                SKU:
                <input type="text"
                    name="sku"
                    id='sku'
                    value={inputValues.sku}
                    onChange={(e) => handleChange(e)} />
            </label>

            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    id='name'
                    value={inputValues.name}
                    onChange={(e) => handleChange(e)} />
            </label>
            <label>
                Price:
                <input type="text"
                    name="price"
                    id='price'
                    value={inputValues.price}
                    onChange={(e) => handleChange(e)} />
            </label>
            <label>
                Type Switcher:
                <select id="productType" name="productType"
                    onChange={(e) => handleChange(e)}>
                    <option value="DVD">DVD</option>
                    <option value="Book">Book</option>
                    <option value="Furniture">Furniture</option>
                </select>
            </label>
        </form>

        <Footer />
    </>
}
export default Add;