import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { getAll, update } from "./BooksAPI";

const BooksApp = () => {
  let [books, setBooks] = useState([]);

  useEffect(() => {
    let handleShelves = async () => {
      try {
        let books = await getAll();
        setBooks(books);
      } catch (error) {}
    };
    handleShelves();
  }, []);

  let handleSelectchanges = async (book, shelf) => {
    try {
      await update(book, shelf);
      setBooks((books) => {
        let cloneBooks = [...books];
        let index = cloneBooks.findIndex((b) => b.id === book.id);
        index > -1
          ? (cloneBooks[index].shelf = shelf)
          : cloneBooks.push({ ...book, shelf });
        return cloneBooks;
      });
    } catch (error) {}
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <Home books={books} handleSelectchanges={handleSelectchanges} />
          )}
        />

        <Route
          path="/search"
          render={() => (
            <Search myBooks={books} handleSelectchanges={handleSelectchanges} />
          )}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default BooksApp;
