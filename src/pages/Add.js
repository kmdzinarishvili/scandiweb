import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';

import "../styles/add.css";



const Add = () => {
    const [inputValues, setInputValue] = useState({
        sku: "",
        name: "",
        price: "",
        productType: "dvd",
        size: "",
        height: "",
        width: "",
        length: "",
        weight: "",
    });
    const [errors, setErrors] = useState({
        skuIsValid: false,
        nameIsValid: false,
        priceIsValid: false,
        sizeIsValid: false,
        heightIsValid: false,
        widthIsValid: false,
        lengthIsValid: false,
        weightIsValid: false,
    });

    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    //handle submit updates

    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    }
    const saveBtn = {
        "text": "Save",
        "function": null,
        "form": 'product_form'
    }

    const cancelBtn = {
        "text": "Cancel",
        "function": () => goToHome(),
    }

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValues, [name]: value });
    }

    //validation useeffect
    useEffect(() => {
        setErrors(() => ({
            "skuIsValid": inputValues["sku"].length > 0,
            "nameIsValid": inputValues["name"].length > 0,
            "priceIsValid": inputValues["price"].length > 0 && !isNaN(inputValues["price"]),
            "sizeIsValid": inputValues["size"].length > 0 && !isNaN(inputValues["size"]),
            "heightIsValid": inputValues["height"].length > 0 && !isNaN(inputValues["height"]),
            "widthIsValid": inputValues["width"].length > 0 && !isNaN(inputValues["width"]),
            "lengthIsValid": inputValues["length"].length > 0 && !isNaN(inputValues["length"]),
            "weightIsValid": inputValues['weight'].length > 0 && !isNaN(inputValues["weight"]),
        }));
    }, [inputValues]);

    //submission useEffect 
    useEffect(() => {
        if (submitting) {
            let valid = (errors["skuIsValid"] &&
                errors["nameIsValid"] &&
                errors["priceIsValid"] && (
                    (inputValues["productType"] === "dvd" && errors["sizeIsValid"]) ||
                    (inputValues["productType"] === "book" && errors["weightIsValid"]) ||
                    (inputValues["productType"] === "furniture" && errors["heightIsValid"] && errors["widthIsValid"] && errors["lengthIsValid"])
                ));
            if (valid) {
                let reqObj = {
                    "sku": inputValues["sku"],
                    "name": inputValues["name"],
                    "price": inputValues["price"],
                    "type": inputValues["productType"],
                }
                if (inputValues.productType === "dvd") {
                    reqObj["size"] = inputValues["size"];
                } else if (inputValues.productType === "book") {
                    reqObj["weight"] = inputValues["weight"];
                } else {
                    reqObj["height"] = inputValues["height"];
                    reqObj["width"] = inputValues["width"];
                    reqObj["length"] = inputValues["length"];
                }
                axios.post(
                    "https://juniortestketimdzinarishvili.herokuapp.com/products/create",
                    reqObj
                ).then(() => {
                    setSubmitting(false);
                    navigate("/");
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                setSubmitting(false);
            }
        }
    }, [errors, submitting, inputValues, navigate]);


    const handleSubmit = async (e) => {
        e?.preventDefault();
        setSubmitted(true);
        setSubmitting(true);
    }

    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            if (index === (form.length - 1)) {
                form.elements[0].click(); // save button
            } else {
                console.log("in else");
                form.elements[index + 1].focus();
            }
            event.preventDefault();
        }
    };


    return <>
        <Header pageName="Add"
            button1={saveBtn}
            button2={cancelBtn} />
        <form id="product_form" onSubmit={handleSubmit}>
            {submitted && !inputValues["sku"] &&
                <p className='error'>Please, submit required data</p>}

            <label>
                SKU:
                <input type="text"
                    name="sku"
                    id='sku'
                    value={inputValues.sku}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={handleEnter}
                />
            </label>
            {submitted && !inputValues["name"] &&
                <p className='error'>Please, submit required data</p>}
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    id='name'
                    value={inputValues.name}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={handleEnter}
                />
            </label>
            {submitted && !inputValues["price"] &&
                <p className='error'>Please, submit required data</p>}
            {
                submitted && isNaN(inputValues["price"]) &&
                <p className='error'>Please, provide the data of indicated type</p>
            }
            <label>
                Price:
                <input type="number"
                    name="price"
                    id='price'
                    value={inputValues.price}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={handleEnter}
                />
            </label>
            <label>
                Type Switcher:
                <select id="productType" name="productType"
                    onKeyDown={handleEnter}
                    onChange={(e) => handleChange(e)}>
                    <option value="dvd">DVD</option>
                    <option value="book">Book</option>
                    <option value="furniture">Furniture</option>
                </select>
            </label>
            {inputValues['productType'] === "dvd" ?
                <div id="DVD">
                    {submitted && !inputValues["size"] &&
                        <p className='error'>Please, submit required data</p>}
                    {
                        submitted && isNaN(inputValues["size"]) &&
                        <p className='error'>Please, provide the data of indicated type</p>
                    }
                    <label>
                        Size(MB)
                        <input type="number"
                            name="size"
                            id='size'
                            value={inputValues.size}
                            onChange={(e) => handleChange(e)}
                            onKeyDown={handleEnter}
                        />
                    </label>
                    <p className='request'>Please, provide size.</p>
                </div>
                : inputValues['productType'] === "furniture" ?
                    <div id="Furniture">
                        {submitted && !inputValues["height"] &&
                            <p className='error'>Please, submit required data</p>}
                        {
                            submitted && isNaN(inputValues["height"]) &&
                            <p className='error'>Please, provide the data of indicated type</p>
                        }
                        <label>
                            Height(CM)
                            <input type="number"
                                name="height"
                                id='height'
                                value={inputValues.height}
                                onChange={(e) => handleChange(e)}
                                onKeyDown={handleEnter}
                            />
                        </label>
                        {submitted && !inputValues["width"] &&
                            <p className='error'>Please, submit required data</p>}
                        {
                            submitted && isNaN(inputValues["width"]) &&
                            <p className='error'>Please, provide the data of indicated type</p>
                        }
                        <label>
                            Width(CM):
                            <input type="number"
                                name="width"
                                id='width'
                                value={inputValues.width}
                                onChange={(e) => handleChange(e)}
                                onKeyDown={handleEnter}
                            />
                        </label>
                        {submitted && !inputValues["length"] &&
                            <p className='error'>Please, submit required data</p>}
                        {
                            submitted && isNaN(inputValues["length"]) &&
                            <p className='error'>Please, provide the data of indicated type</p>
                        }
                        <label>
                            Length(CM):
                            <input type="number"
                                name="length"
                                id='length'
                                value={inputValues.length}
                                onChange={(e) => handleChange(e)}
                                onKeyDown={handleEnter}
                            />
                        </label>
                        <p className='request'>Please, provide dimensions.</p>
                    </div> :
                    <div id="Book">
                        {submitted && !inputValues["weight"] &&
                            <p className='error'>Please, submit required data</p>}
                        {
                            submitted && isNaN(inputValues["weight"]) &&
                            <p className='error'>Please, provide the data of indicated type</p>
                        }
                        <label>
                            Weight(KG):
                            <input type="number"
                                name="weight"
                                id='weight'
                                value={inputValues.weight}
                                onChange={(e) => handleChange(e)}
                                onKeyDown={handleEnter}
                            />
                        </label>
                        <p className='request'>Please, provide weight.</p>
                    </div>}
        </form>


        <Footer />
    </>
}
export default Add;