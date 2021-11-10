import React, { useState, useContext, useEffect } from 'react';
import BookContext from '../../context/book/bookContest';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';

const BookForm = () => {
  const bookContext = useContext(BookContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const { addBook, current, clearCurrent, updateBook } = bookContext;

  useEffect(() => {
    if (current !== null) {
      setBook(current);
    } else {
      setBook({
        title: '',
        publication_house: '',
        author: '',
        genre: '',
        published_date: '',
        publisher: '',
      });
    }
  }, [bookContext, current]);

  const [book, setBook] = useState({
    title: '',
    publication_house: '',
    author: '',
    genre: '',
    published_date: '',
    publisher: '',
  });

  const { title, publication_house, author, genre, published_date, publisher } =
    book;

  const onChange = (e) => setBook({ ...book, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      addBook(book);
      setAlert('Add the book successfully', 'success');
    } else {
      setAlert('Update the book successfully', 'success');
      updateBook(book);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit Book' : 'Add Book'}</h2>
      <input
        type="text"
        placeholder="Title of the Book"
        name="title"
        className="form-control"
        onChange={onChange}
        value={title}
      />
      <input
        type="text"
        placeholder="Publication House"
        name="publication_house"
        className="form-control"
        onChange={onChange}
        value={publication_house}
      />

      <input
        type="text"
        placeholder="Genre"
        name="genre"
        className="form-control"
        onChange={onChange}
        value={genre}
      />
      <input
        type="text"
        placeholder="Author"
        name="author"
        className="form-control"
        onChange={onChange}
        value={author}
      />
      <input
        type="date"
        placeholder="published_date"
        name="published_date"
        className="form-control"
        onChange={onChange}
        value={published_date}
      />

      <input
        type="text"
        placeholder="Publisher of this Book"
        name="publisher"
        className="form-control"
        onChange={onChange}
        value={publisher}
      />
      <div>
        <input
          type="submit"
          value={current ? 'Update Book' : 'Add Book'}
          className="btn btn-primary btn-block"
        />

        <Link to="/">
          <input
            type="button"
            className="btn btn-primary btn-block"
            value="Back "
          />
        </Link>
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default BookForm;
