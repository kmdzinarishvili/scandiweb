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

    const fetchData = async () => {
        const result = await axios(
            "https://juniortestketimdzinarishvili.herokuapp.com/products/",
        );
        return result;
    }
    useEffect(() => {

        fetchData().then((res) => {
            setData(res.data);
        }
        );
    }, []);

    const handleCheck = async (id) => {
        setChecked((prev) => {
            if (prev.includes(id)) {
                let newChecked = prev;
                newChecked.splice(prev.indexOf(id), 1);
                return newChecked;
            } else {
                return [...prev, id];
            }
        });
    };
    const navToAdd = () => {
        navigate('/add-product');
    }
    const massDelete = async () => {
        if (checked.length > 0) {
            await axios.delete(
                "https://juniortestketimdzinarishvili.herokuapp.com/products/massDelete",
                {
                    data: {
                        "skus": checked
                    }
                }
            )
            fetchData().then((res) => {
                setData(res.data);
            });
        }
    }


    const addBtn = {
        "text": "ADD",
        "function": () => navToAdd(),
    };

    const delBtn = {
        "text": "MASS DELETE",
        "function": () => massDelete(),
        "id": "delete-product-btn"
    }
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
                />

            })}
        </div>
        <Footer />
    </div>
}
export default Home;