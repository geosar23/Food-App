import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Home from './Views/Home'

function App() {
  
  return (
    <div className="relative pb-10 min-h-screen">
      

      <Router>

        <Header/>

        <div className="">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
          </Switch>
        </div>

        <Footer/>

      </Router>
    </div>
  );
}

export default App;
