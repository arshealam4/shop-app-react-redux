import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home } from "./components/Home";
import NavBar from "./components/NavBar";
import "react-toastify/dist/ReactToastify.css";
import Cart from './components/Cart';

class App extends Component {
  state = {};
  render() {
    return (
      <div className="bg-light">
        <ToastContainer />
        <NavBar />
        <div className="container">
          <Switch>
            <Route path="/product" exact component={Home} />
            <Route path="/cart" exact component={Cart} />
            <Redirect from="/" to="/product" exact component={Home} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
