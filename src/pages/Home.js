import React, { useEffect, useState } from "react";
import Shelf from "../components/sharedComponents/Shelf";
import { Link } from "react-router-dom";

function Home({ books, handleSelectchanges }) {
  let [shelves, setShelves] = useState([
    {
      label: "Currently Reading",
      value: "currentlyReading",
      books: [],
    },
    {
      label: "Want To Read",
      value: "wantToRead",
      books: [],
    },
    {
      label: "Read",
      value: "read",
      books: [],
    },
  ]);

  useEffect(() => {
    setShelves((shelves) =>
      shelves.map((shelf) => ({
        ...shelf,
        books: books.filter((b) => b.shelf === shelf.value),
      }))
    );
  }, [books]);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map(({ label, books }, i) => (
            <Shelf
              key={i}
              label={label}
              books={books}
              handleSelectchanges={handleSelectchanges}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link className="open-search" to="/search" />
      </div>
    </div>
  );
}

export default Home;
