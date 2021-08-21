import React from "react";

let options = [
  { value: "currentlyReading", label: "Currently Reading" },
  { value: "wantToRead", label: "Want to Read" },
  { value: "read", label: "Read" },
  { value: "none", label: "None" },
];

function Select({ value = "none", handleChange }) {
  return (
    <div className="book-shelf-changer">
      <select value={value} onChange={handleChange}>
        <option disabled value="move">
          Move to...
        </option>
        {options.map(({ value, label }, i) => (
          <option key={i} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
