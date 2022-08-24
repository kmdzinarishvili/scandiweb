import { useNavigate } from 'react-router-dom';


import Header from '../components/Header';
import Footer from '../components/Footer';

import "../styles/home.css";


const Home = () => {
    const navigate = useNavigate();


    const navToAdd = () => {
        navigate('/add-product');
    }
    const navToHome = () => {
        navigate('/');
    }



    const addBtn = {
        "text": "HOME",
        "function": () => navToHome(),
    };

    const delBtn = {
        "text": "ADD",
        "function": () => navToAdd(),
    }
    return <div className="App">
        <Header pageName="List"
            button1={addBtn}
            button2={delBtn} />
        <main style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <p>There's nothing here!</p>
        </main>
        <Footer />
    </div>
}
export default Home;