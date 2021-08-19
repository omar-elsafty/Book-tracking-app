import React, { useState } from "react";
import { Link } from "react-router-dom";
import { debounce } from "debounce";
import { search, update } from "../BooksAPI";
import Book from "../components/sharedComponents/Book";

function Search() {
  const [books, setBooks] = useState([]);
  let handleSearch = debounce(async (searchKey) => {
    let result = await search(searchKey);
    Array.isArray(result) ? setBooks(result) : setBooks([]);
  }, 500);

  let handleSelectchanges = async (book, shelf) => {
    try {
      let result = await update(book, shelf);
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
            <Book
              key={i}
              book={book}
              handleSelectchanges={handleSelectchanges}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Search;
