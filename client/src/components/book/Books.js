import React, { Fragment, useContext, useEffect } from 'react';
import BookContext from '../../context/book/bookContest';
import BookItems from './Bookitems';
import Spinner from '../layout/Spinner';

const Books = () => {
  const bookContext = useContext(BookContext);

  const { books, filtered, getBooks, loading } = bookContext;

  useEffect(() => {
    getBooks();

    // eslint-disable-next-line
  }, []);

  if (books !== null && books.length === 0 && !loading) {
    return <h4>Please use the form to add a Books.</h4>;
  }

  return (
    <Fragment>
      {books !== null && !loading ? (
        <Fragment>
          {filtered !== null
            ? filtered.map((book) => <BookItems key={book._id} book={book} />)
            : books.map((book) => <BookItems key={book._id} book={book} />)}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Books;
