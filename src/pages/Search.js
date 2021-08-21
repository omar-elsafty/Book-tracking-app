import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { debounce } from "debounce";
import { search, update } from "../BooksAPI";
import Book from "../components/sharedComponents/Book";

function Search({ myBooks, handleSelectchanges }) {
  const [books, setBooks] = useState([]);

  let handleSearch = debounce(async (searchKey) => {
    let result = await search(searchKey);
    if (Array.isArray(result)) {
      result.forEach((r) => {
        let index = myBooks.findIndex((myBook) => myBook.id === r.id);
        if (index > -1) {
          r.shelf = myBooks[index].shelf;
        }
      });
      setBooks(result);
    } else {
      setBooks([]);
    }
  }, 500);

  let handleChange = async (book, shelf) => {
    try {
      await handleSelectchanges(book, shelf);
      setBooks((prev) => {
        let cloneBooks = [...prev];
        let index = cloneBooks.findIndex((b) => b.id === book.id);
        cloneBooks[index].shelf = shelf;
        return cloneBooks;
      });
    } catch (error) {}
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          About
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={({ target: { value } }) => {
              handleSearch(value);
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book, i) => (
            <Book key={i} book={book} handleSelectchanges={handleChange} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Search;
