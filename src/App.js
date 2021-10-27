import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"

function App() {
  return (
    <div className="app-header">
      

      <Router>

        <Header/>

        <div className="py-3">
          <Switch>
            <Route exact path="/">
              <h1 className="font bold text-2xl">This is the home page</h1>
            </Route>
            <Route path="/about">
              <h1 className="font bold text-2xl">About us</h1>
            </Route>
          </Switch>
        </div>

        <Footer/>

      </Router>
    </div>
  );
}

export default App;
