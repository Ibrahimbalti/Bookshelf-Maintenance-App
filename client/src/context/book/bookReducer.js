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
  BOOK_ERROR,
  STATUS_BOOK,
  CLEAR_STATUS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_BOOK:
      return {
        ...state,
        books: action.payload,
        loading: false,
      };
    case ADD_BOOK:
      return {
        ...state,
        books: [action.payload],
      };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book._id === action.payload._id ? action.payload : book
        ),
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book._id !== action.payload),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    case STATUS_BOOK:
      return {
        ...state,
        status: action.payload,
      };
    case CLEAR_STATUS:
      return {
        ...state,
        status: null,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_BOOK:
      return {
        ...state,
        filtered: state.books.filter((books) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return books.genre.match(regex) || books.author.match(regex);
        }),
      };
    case CLEAR_BOOK:
      return {
        ...state,
        books: null,
        filtered: null,
        error: null,
        current: null,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case BOOK_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
