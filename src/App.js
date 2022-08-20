import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="App">
      <Header pageName="List"
        funct1={() => console.log("clicked")}
        funct2={() => console.log("clicked2")} />

      <Footer />
    </div>
  );
}

export default App;
