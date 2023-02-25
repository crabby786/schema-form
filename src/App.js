import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import {registerSchema} from "./Utils/schema/register_client_schema";
import Client from "./components/Client";
import ClientList from "./components/ClientList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          test app
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/Clients"} className="nav-link">
              Clients
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
          <Route exact path={["/", "/Clients"]} component={ClientList} />
          <Route exact path="/add" render={(prop)=> <AddTutorial {...prop} schema = {registerSchema}  /> } />
          <Route path="/client/:id" component={Client} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
