import Header from '../components/Header';
import Footer from '../components/Footer';
const Home = () => {
    return <div className="App">
        <Header pageName="List"
            funct1={() => console.log("clicked")}
            funct2={() => console.log("clicked2")} />

        <Footer />
    </div>
}
export default Home;