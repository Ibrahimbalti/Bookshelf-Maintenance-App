import React, { useContext, useRef, useEffect } from 'react';
import BookContext from '../../context/book/bookContest';

const BookFilter = () => {
  const bookContext = useContext(BookContext);
  const { filterBOOK, clearFilter, filtered } = bookContext;
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterBOOK(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Search Book"
        onChange={onChange}
      />
    </form>
  );
};

export default BookFilter;
