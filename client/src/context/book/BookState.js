import React, { useReducer } from 'react';
import axios from 'axios';
import bookContext from './bookContest';
import bookReducer from './bookReducer';

import {
  GET_BOOK,
  ADD_BOOK,
  DELETE_BOOK,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BOOK,
  FILTER_BOOK,
  CLEAR_BOOK,
  CLEAR_FILTER,
  STATUS_BOOK,
  CLEAR_STATUS,
} from '../types.js';

const BookState = (props) => {
  const initialState = {
    books: null,
    current: null,
    filtered: null,
    error: null,
    status: null,
  };

  const [state, dispatch] = useReducer(bookReducer, initialState);

  // Get Contacts
  const getBooks = async () => {
    try {
      const res = await axios.get('/api/book');
      dispatch({ type: GET_BOOK, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  // Add Contact
  const addBook = async (book) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/book', book, config);
      console.log('stat of data', res);
      dispatch({ type: ADD_BOOK, payload: res.data });
    } catch (err) {
      console.log('error is erro', err);
    }
  };

  // Delete Contact
  const deleteBook = async (id) => {
    try {
      await axios.delete(`/api/book/${id}`);
      dispatch({ type: DELETE_BOOK, payload: id });
    } catch (err) {
      console.log(err);
    }
  };

  // Set Current Contact
  const setCurrent = (book) => {
    dispatch({ type: SET_CURRENT, payload: book });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update Contact
  const updateBook = async (book) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(`/api/book/${book._id}`, book, config);
      dispatch({ type: UPDATE_BOOK, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  // Filter Contacts
  const filterBOOK = (text) => {
    dispatch({ type: FILTER_BOOK, payload: text });
  };

  // Clear Contacts
  const clearBOOK = () => {
    dispatch({ type: CLEAR_BOOK });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // status
  // Filter Contacts
  const BookStatus = (status) => {
    dispatch({ type: STATUS_BOOK, payload: status });
  };

  const ClearStatus = () => {
    dispatch({ type: CLEAR_STATUS });
  };

  return (
    <bookContext.Provider
      value={{
        books: state.books,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        status: state.status,
        addBook,
        updateBook,
        deleteBook,
        setCurrent,
        clearCurrent,
        filterBOOK,
        clearFilter,
        getBooks,
        clearBOOK,
        BookStatus,
        ClearStatus,
      }}
    >
      {props.children}
    </bookContext.Provider>
  );
};

export default BookState;
