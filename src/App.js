import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

const BooksApp = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={Search} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default BooksApp;
