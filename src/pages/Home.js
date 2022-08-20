import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Product from '../components/Product';
import "../styles/home.css";

const Home = () => {
    let data = [
        {
            "sku": 1,
            "name": "anme",
            "price": 12423,
            "type": "type"
        },
        {
            "sku": 2,
            "name": "anme",
            "price": 12423,
            "type": "type"
        },
        {
            "sku": 3,
            "name": "anme",
            "price": 12423,
            "type": "type"
        },
        {
            "sku": 4,
            "name": "anme",
            "price": 12423,
            "type": "type"
        },
        {
            "sku": 5,
            "name": "anme",
            "price": 12423,
            "type": "type"
        },

    ];

    const [checked, setChecked] = useState([]);

    const handleCheck = async (id) => {
        setChecked((prev) => {
            if (prev.includes(id)) {
                return prev.splice(prev.indexOf(id));
            } else {
                return [...prev, id];
            }
        });
    };

    return <div className="App">
        <Header pageName="List"
            funct1={() => console.log("clicked")}
            funct2={() => console.log("clicked2")} />
        <div className="container">
            {data.map((item) => {
                return <Product
                    handleCheck={() => handleCheck(item.sku)}
                    key={item.sku}
                    sku={item.sku}
                    name={item.name}
                    price={item.price}
                    type={item.type}
                    isChecked={checked.includes(item.sku)}
                />

            })}
        </div>

        <Footer />
    </div>
}
export default Home;