import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';



const Add = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    }
    const saveBtn = {
        "text": "save",
        "function": () => console.log("save"),
        "id": "save-product-btn"
    }

    const cancelBtn = {
        "text": "cancel",
        "function": () => goToHome(),
        "id": 'cancel-btn'
    }

    return <> <Header pageName="Add"
        button1={saveBtn}
        button2={cancelBtn} />
        <div className="container">

        </div>

        <Footer />
    </>
}
export default Add;