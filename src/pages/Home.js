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
            "sku": 1,
            "name": "anme",
            "price": 12423,
            "type": "type"
        },
        {
            "sku": 1,
            "name": "anme",
            "price": 12423,
            "type": "type"
        },
        {
            "sku": 1,
            "name": "anme",
            "price": 12423,
            "type": "type"
        },
        {
            "sku": 1,
            "name": "anme",
            "price": 12423,
            "type": "type"
        },
        {
            "sku": 1,
            "name": "anme",
            "price": 12423,
            "type": "type"
        },
        {
            "sku": 1,
            "name": "anme",
            "price": 12423,
            "type": "type"
        }
    ]


    return <div className="App">
        <Header pageName="List"
            funct1={() => console.log("clicked")}
            funct2={() => console.log("clicked2")} />
        <div className="container">
            {data.map((item) => {
                return <Product
                    sku={item.sku}
                    name={item.name}
                    price={item.price}
                    type={item.type} />

            })}
        </div>

        <Footer />
    </div>
}
export default Home;