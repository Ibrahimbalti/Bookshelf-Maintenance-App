import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import BookContext from '../../context/book/bookContest';
import { Link } from 'react-router-dom';

const BookItems = ({ book }) => {
  const bookContext = useContext(BookContext);
  const { deleteBook, setCurrent, clearCurrent } = bookContext;

  const { _id, author, genre } = book;

  // console.log(contact);

  const onDelete = () => {
    deleteBook(_id);
    clearCurrent();
  };

  return (
    <div className="card-container">
      <div>
        <img
          src="https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3"
          alt="books"
        />
      </div>

      <div>
        <h2>Genre: {genre}</h2>
        <h3>Author: {author}</h3>
      </div>
      <p>
        <Link to="/add-book">
          <button
            className="btn btn-dark btn-sm"
            onClick={() => setCurrent(book)}
          >
            Edit
          </button>
        </Link>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>

        <Link to="/book-status">
          <button className="btn btn-success btn-sm">status</button>
        </Link>
      </p>
    </div>
  );
};

BookItems.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BookItems;
