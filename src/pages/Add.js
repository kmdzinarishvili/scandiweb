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
        // if (submitted) {
        validate();
        // }
    }


    const validate = () => {
        if (inputValues["sku"].length > 0) {
            setErrors((prev) => { return { ...prev, "skuIsValid": true } });
        }
        if (inputValues["name"].length > 0) {
            setErrors((prev) => { return { ...prev, "nameIsValid": true } });
        }
        if (inputValues["price"].length > 0 && !isNaN(inputValues["price"])) {
            setErrors((prev) => { return { ...prev, "priceIsValid": true } });
        }
        if (inputValues['size'].length > 0 && !isNaN(inputValues["size"])) {
            setErrors((prev) => { return { ...prev, "sizeIsValid": true } });
        }
        if (inputValues["height"].length > 0 && !isNaN(inputValues["height"])) {
            setErrors((prev) => { return { ...prev, "heightIsValid": true } });
        }
        if (inputValues["width"].length > 0 && !isNaN(inputValues["width"])) {
            setErrors((prev) => { return { ...prev, "widthIsValid": true } });
        }
        if (inputValues["length"].length > 0 && !isNaN(inputValues["length"])) {
            setErrors((prev) => { return { ...prev, "lengthIsValid": true } });
        }
        if (inputValues['weight'].length > 0 && !isNaN(inputValues["weight"])) {
            setErrors((prev) => { return { ...prev, "weightIsValid": true } });
        }

        let isValid = errors["skuIsValid"] && errors["nameIsValid"] && errors["priceIsValid"];
        if (inputValues.productType === "DVD") {
            isValid = isValid && errors["sizeIsValid"];
        } else if (inputValues.productType === "Book") {
            isValid = isValid && errors["weightIsValid"];
        } else {
            isValid = isValid && errors["heightIsValid"] && errors["widthIsValid"] && errors["lengthIsValid"];
        }
        return isValid;


    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);


        const valid = validate();
        if (valid) {
            //send request
            navigate("/");
        }
        console.log(inputValues);
        console.log(submitted);
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
                    value={inputValues.sku}
                    onChange={(e) => handleChange(e)}
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
                />
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
            {inputValues['productType'] === "DVD" ?
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
                        />
                    </label>
                    <p>Please, provide size.</p>
                </div>
                : inputValues['productType'] === "Furniture" ?
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
                            />
                        </label>
                        {submitted && !inputValues["width"] &&
                            <p className='error'>Please, submit required data</p>}
                        {
                            submitted && isNaN(inputValues["width"]) &&
                            <p className='error'>Please, provide the data of indicated type</p>
                        }
                        <label>
                            Width(CM)
                            <input type="number"
                                name="width"
                                id='width'
                                value={inputValues.width}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                        {submitted && !inputValues["length"] &&
                            <p className='error'>Please, submit required data</p>}
                        {
                            submitted && isNaN(inputValues["length"]) &&
                            <p className='error'>Please, provide the data of indicated type</p>
                        }
                        <label>
                            Length(CM)
                            <input type="number"
                                name="length"
                                id='length'
                                value={inputValues.length}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                        <p>Please, provide dimensions.</p>
                    </div> :
                    <div id="Book">
                        {submitted && !inputValues["weight"] &&
                            <p className='error'>Please, submit required data</p>}
                        {
                            submitted && isNaN(inputValues["weight"]) &&
                            <p className='error'>Please, provide the data of indicated type</p>
                        }
                        <label>
                            Weight(KG)
                            <input type="number"
                                name="weight"
                                id='weight'
                                value={inputValues.weight}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                        <p>Please, provide weight.</p>
                    </div>}
        </form>

        <Footer />
    </>
}
export default Add;