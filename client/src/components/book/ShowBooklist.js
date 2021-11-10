import React, { Fragment, useContext, useEffect } from 'react';
import BookContext from '../../context/book/bookContest';
import StatusComplete from './StatusComplete';
const ShowBooklist = () => {
  const bookContext = useContext(BookContext);

  const { books, getBooks, status, ClearStatus } = bookContext;

  console.log('status in book list ', status);
  useEffect(() => {
    if (status !== null) {
      getBooks();
    }

    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      {status !== null
        ? books.map((book) => <StatusComplete key={book._id} book={book} />)
        : console.log('No books')}
    </Fragment>
  );
};

export default ShowBooklist;
