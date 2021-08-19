import React, { useEffect, useState } from "react";
import Shelf from "../components/sharedComponents/Shelf";
import { getAll, update } from "../BooksAPI";
import { Link } from "react-router-dom";

function Home() {
  let [books, setBooks] = useState([]);
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
    let handleShelves = async () => {
      let books = await getAll();
      setBooks(books);
      setShelves((shelves) =>
        shelves.map((shelf) => ({
          ...shelf,
          books: books.filter((b) => b.shelf === shelf.value),
        }))
      );
    };
    handleShelves();
  }, []);

  let handleSelectchanges = async (book, shelf) => {
    try {
      let result = await update(book, shelf);
      setShelves((shelves) =>
        shelves.map((shelf) => {
          let { value } = shelf;
          let filteredArray = result[value];
          return {
            ...shelf,
            books: books.filter((b) => filteredArray.includes(b.id)),
          };
        })
      );
    } catch (error) {}
  };

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
