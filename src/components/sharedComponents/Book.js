import React from "react";
import Select from "../inputs/Select";
import noImage from "../../assets/noImage.png";

function Book({ book, handleSelectchanges }) {
  let { imageLinks = { thumbnail: "" }, shelf, title, authors = [] } = book;

  let handleChange = ({ target: { value } }) => {
    handleSelectchanges(book, value);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={
            imageLinks.thumbnail
              ? {
                  width: 128,
                  height: 193,
                  backgroundImage: `url("${imageLinks.thumbnail}")`,
                }
              : {
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${noImage})`,
                }
          }
        />
        <Select value={shelf} handleChange={handleChange} />
      </div>
      <div className="book-title">{title}</div>
      {authors.map((author, i) => (
        <div key={i} className="book-authors">
          {author}
        </div>
      ))}
    </div>
  );
}

export default Book;
