import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import BookContext from '../../context/book/bookContest';
const BookStatus = () => {
  const [statuss, setStatus] = useState('');

  const bookContext = useContext(BookContext);
  const { BookStatus } = bookContext;

  const onChange = (e) => {
    setStatus({ ...statuss, [e.target.name]: e.target.value });
    console.log('status are', statuss);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    BookStatus(statuss);
    console.log('hello status');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label forhtml="status">Choose a Status of book:</label>

        <select name="statuss" id="status" onChange={onChange}>
          <option value={statuss.Reading} name="Reading">
            Reading
          </option>
          <option value={statuss.complete} name="complete">
            complete
          </option>
          <option value={statuss.PlantoRead} name="PlantoRead">
            Plan to Read
          </option>
        </select>

        <div>
          <input
            type="submit"
            value="Change status"
            className="btn btn-primary btn-block"
          />
        </div>
      </form>

      <Link to="/">
        <input
          type="button"
          className="btn btn-primary btn-block"
          value="Back "
        />
      </Link>
    </div>
  );
};

export default BookStatus;
