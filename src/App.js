import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Home from './Views/Home'
import About from './Views/About'
import Product from './Views/Product'

function App() {
  return (
    <div className="app-header">
      

      <Router>

        <Header/>

        <div className="">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/about">
              <About/>
            </Route>
            <Route path="/products/:id">
              <Product/>
            </Route>
          </Switch>
        </div>

        <Footer/>

      </Router>
    </div>
  );
}

export default App;
