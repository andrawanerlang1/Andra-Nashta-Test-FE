import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddEvent from "./pages/Add Event/AddEvent";
import Navigation from "./components/Navigation/Navigation";

export default function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/addevent" exact component={AddEvent} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}
