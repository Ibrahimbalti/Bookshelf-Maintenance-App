import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
const AddBtn = () => {
  const authContext = useContext(AuthContext);
  const { user, deleteAcount } = authContext;
  const onDelete = () => {
    deleteAcount(user._id);
  };
  return (
    <div className="col-md-11">
      <Link to="/add-book" className="btn btn-outline-warning float-right">
        + Add New Book
        {/* <BookForm /> */}
      </Link>

      <button
        className="btn btn-outline-warning float-right"
        onClick={onDelete}
      >
        Delete Account
      </button>
      <br />
      <br />
      <hr />
    </div>
  );
};

export default AddBtn;
