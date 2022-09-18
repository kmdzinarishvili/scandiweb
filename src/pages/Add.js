import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';

import "../styles/add.css";



const Add = () => {
    const [inputValues, setInputValues] = useState({
        sku: "",
        name: "",
        price: "",
        productType: "dvd",
        "dvd": {
            size: ""
        },
        "furniture": {
            height: "",
            width: "",
            length: "",
        },
        "book": {
            weight: "",
        }
    });
    const [errors, setErrors] = useState({
        skuIsValid: false,
        nameIsValid: false,
        priceIsValid: false,
        "dvd": {
            sizeIsValid: false,
        },
        "furniture": {

            heightIsValid: false,
            widthIsValid: false,
            lengthIsValid: false,
        },
        "book": {
            weightIsValid: false,
        }
    });

    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);


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
        setInputValues((prev) => {
            return ({ ...prev, [name]: value })
        });
    }
    const handleSpecificChange = async (e) => {
        const { name, value } = e.target;
        setInputValues((prev) => {
            prev[prev['productType']][name] = value;
            return { ...prev };
        });
    }

    //validation useeffect
    useEffect(() => {
        setErrors(() => ({
            "skuIsValid": inputValues["sku"].length > 0,
            "nameIsValid": inputValues["name"].length > 0,
            "priceIsValid": inputValues["price"].length > 0 && !isNaN(inputValues["price"]),
            "dvd": {
                "sizeIsValid": inputValues["dvd"]["size"].length > 0 && !isNaN(inputValues["dvd"]["size"]),
            },
            "furniture": {
                "heightIsValid": inputValues["furniture"]["height"].length > 0 && !isNaN(inputValues["furniture"]["height"]),
                "widthIsValid": inputValues["furniture"]["width"].length > 0 && !isNaN(inputValues["furniture"]["width"]),
                "lengthIsValid": inputValues["furniture"]["length"].length > 0 && !isNaN(inputValues["furniture"]["length"]),
            },
            "book": {
                "weightIsValid": inputValues["book"]['weight'].length > 0 && !isNaN(inputValues["book"]["weight"]),
            }
        }));
    }, [inputValues]);

    //submission useEffect 
    useEffect(() => {
        if (submitting) {

            let generalValid = (errors["skuIsValid"] &&
                errors["nameIsValid"] &&
                errors["priceIsValid"]
            );
            let specificValid = true;
            Object.entries(errors[inputValues["productType"]]).forEach(([key, bool]) => {
                specificValid = specificValid && bool;
            });
            if (generalValid && specificValid) {
                let reqObj = {
                    "sku": inputValues["sku"],
                    "name": inputValues["name"],
                    "price": inputValues["price"],
                    "type": inputValues["productType"],
                    ...inputValues[inputValues["productType"]]
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
                form.elements[index + 1].focus();
            }
            event.preventDefault();
        }
    };

    const BookInputs = () => {
        return (<div id="Book">
            {submitted && !inputValues["book"]["weight"] &&
                <p className='error'>Please, submit required data</p>}
            {
                submitted && isNaN(inputValues["book"]["weight"]) &&
                <p className='error'>Please, provide the data of indicated type</p>
            }
            <label>
                Weight(KG):
                <input type="number"
                    name="weight"
                    id='weight'
                    value={inputValues["book"]["weight"]}
                    onChange={(e) => handleSpecificChange(e)}
                    onKeyDown={handleEnter}
                />
            </label>
            <p className='request'>Please, provide weight.</p>
        </div>);
    };
    const FurnitureInputs = () => {
        return (
            <div id="Furniture">
                {submitted && !inputValues["furniture"]["height"] &&
                    <p className='error'>Please, submit required data</p>}
                {
                    submitted && isNaN(inputValues["furniture"]["height"]) &&
                    <p className='error'>Please, provide the data of indicated type</p>
                }
                <label>
                    Height(CM)
                    <input type="number"
                        name="height"
                        id='height'
                        value={inputValues["furniture"]["height"]}
                        onChange={(e) => handleSpecificChange(e)}
                        onKeyDown={handleEnter}
                    />
                </label>
                {submitted && !inputValues["furniture"]["width"] &&
                    <p className='error'>Please, submit required data</p>}
                {
                    submitted && isNaN(inputValues["furniture"]["width"]) &&
                    <p className='error'>Please, provide the data of indicated type</p>
                }
                <label>
                    Width(CM):
                    <input type="number"
                        name="width"
                        id='width'
                        value={inputValues["furniture"]["width"]}
                        onChange={(e) => handleSpecificChange(e)}
                        onKeyDown={handleEnter}
                    />
                </label>
                {submitted && !inputValues["furniture"]["length"] &&
                    <p className='error'>Please, submit required data</p>}
                {
                    submitted && isNaN(inputValues["furniture"]["length"]) &&
                    <p className='error'>Please, provide the data of indicated type</p>
                }
                <label>
                    Length(CM):
                    <input type="number"
                        name="length"
                        id='length'
                        value={inputValues["furniture"]["length"]}
                        onChange={(e) => handleSpecificChange(e)}
                        onKeyDown={handleEnter}
                    />
                </label>
                <p className='request'>Please, provide dimensions.</p>
            </div>
        )
    }
    const DVDInputs = () => {
        return (<div id="DVD">
            {submitted && !inputValues["dvd"]["size"] &&
                <p className='error'>Please, submit required data</p>}
            {
                submitted && isNaN(inputValues["dvd"]["size"]) &&
                <p className='error'>Please, provide the data of indicated type</p>
            }
            <label>
                Size(MB)
                <input type="number"
                    name="size"
                    id='size'
                    value={inputValues["dvd"]["size"]}
                    onChange={(e) => handleSpecificChange(e)}
                    onKeyDown={handleEnter}
                />
            </label>
            <p className='request'>Please, provide size.</p>
        </div>)
    }

    const typeSpecificInputs = {
        "dvd": DVDInputs(),
        "furniture": FurnitureInputs(),
        "book": BookInputs()
    }


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
                    value={inputValues["sku"]}
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
                    value={inputValues["name"]}
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
                    value={inputValues["price"]}
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
            {typeSpecificInputs[inputValues['productType']]}
        </form>


        <Footer />
    </>
}
export default Add;