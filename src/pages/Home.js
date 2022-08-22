import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Product from '../components/Product';
import "../styles/home.css";


const Home = () => {
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                "https://juniortestketimdzinarishvili.herokuapp.com/api/products/read.php"
            );
            return result;
        }
        fetchData().then((response) => {
            setData(response.data);
        }
        );
    }, []);

    const handleCheck = async (id) => {
        setChecked((prev) => {
            if (prev.includes(id)) {
                return prev.splice(prev.indexOf(id));
            } else {
                return [...prev, id];
            }
        });
    };
    const navToAdd = () => {
        navigate('/add-product');
    }
    const addBtn = {
        "text": "ADD",
        "function": () => navToAdd(),
    };

    //ADD MASS DELETE FUNCTIONALITY
    const delBtn = {
        "text": "MASS DELETE",
        "function": () => console.log("mass delete"),
        "id": "delete-product-btn"
    }
    //navigate

    return <div className="App">
        <Header pageName="List"
            button1={addBtn}
            button2={delBtn} />
        <div className="container">
            {data.map((item) => {
                return <Product
                    handleCheck={() => handleCheck(item.sku)}
                    key={item.sku}
                    item={item}

                    isChecked={checked.includes(item.sku)}
                />

            })}
        </div>

        <Footer />
    </div>
}
export default Home;