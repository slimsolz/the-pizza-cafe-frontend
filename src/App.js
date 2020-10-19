import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Menu from "./components/Menu/Menu";
import { Provider } from "./store";
import Cart from "./components/Cart/Cart";

toast.configure({
  style: { fontSize: "14px", textTransform: "capitalize" },
});
function App() {
  return (
    <Provider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/menu" component={Menu} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
