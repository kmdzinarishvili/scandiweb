
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Add from './pages/Add';
import Error from './pages/Error';

import './App.css';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path="/add-product" element={<Add />} />
        <Route
          path="*"
          element={<Error />}
        />
      </Routes>
    </Router>
  );
}

export default App;
