import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchBooks } from 'redux/books/booksOperations';
import { selectBookData } from 'redux/books/booksSelectors';
import sprite from '../../img/sprite.svg';

const RecommendedBooks = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookInfo, setBookInfo] = useState(false);
  const booksData = useSelector(selectBookData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks({ page: 1, limit: 10 }));
  }, [dispatch]);

  const openModalHandler = book => {
    setModalOpen(true);
    setBookInfo(book);
  };

  return (
    <div>
      <div>
        <h4>Recommended books</h4>
        <ul>
          {booksData?.slice(3, 6).map(book => (
            <li key={book._id}>
              <img
                src={book.imageUrl}
                alt="book title"
                onClick={() => openModalHandler(book)}
              />
              <h4>{book.title}</h4>
              <p>{book.author}</p>
            </li>
          ))}
        </ul>
        <NavLink to="/recommended">
          <p>Home </p>
          <svg>
            <use href={`${sprite}#icon-arrow-right`} />
          </svg>
        </NavLink>
      </div>

      {/* <PortalModal active={modalOpen} setActive={setModalOpen}>
        <DetailedBookInfo
          bookInfo={bookInfo}
          closeModal={() => setModalOpen()}
          buttonLabel="Add to library"
        />
      </PortalModal> */}
    </div>
  );
};

export default RecommendedBooks;
