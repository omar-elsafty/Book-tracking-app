import React from "react";
import Book from "./Book";

function Shelf({ label = "", books = [] ,handleSelectchanges}) {
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{label}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, i) => (
              <li key={i}>
                <Book book={book} handleSelectchanges={handleSelectchanges} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Shelf;
