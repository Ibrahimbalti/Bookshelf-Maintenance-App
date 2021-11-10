import React, { useContext, useEffect } from 'react';
import BookFilter from '../book/BookFilter';
import AuthContext from '../../context/auth/authContext';
import Books from '../book/Books';
import AddBtn from '../layout/AddBtn';
import ShowBooklist from '../book/ShowBooklist';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        <BookFilter />
        <AddBtn />
      </div>

      <h2 style={{ textAlign: 'center' }}>Reading </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Books />
      </div>

      <br />
      <br />
      <br />

      <h2 style={{ textAlign: 'center' }}>Completed </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ShowBooklist />
      </div>
      <br />
      <br />
      <br />
      <h2 style={{ textAlign: 'center' }}>Plan to Read </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Books />
      </div>
    </div>
  );
};

export default Home;
