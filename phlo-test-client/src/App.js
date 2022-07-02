import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddSaleOrder from "./components/AddSaleOrder";
import SaleOrder from "./components/SaleOrder";
import SaleOrderList from "./components/SaleOrderList";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/sale-orders" className="navbar-brand">
          Phlo
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/sale-orders"} className="nav-link">
              Sale Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/sale-orders"]} component={SaleOrderList} />
          <Route exact path="/add" component={AddSaleOrder} />
          <Route path="/sale-orders/:id" component={SaleOrder} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
