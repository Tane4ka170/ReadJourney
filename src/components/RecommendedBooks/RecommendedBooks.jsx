import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../redux/books/booksOperations';
import { selectBookData } from '../../redux/books/booksSelectors';
import sprite from '../../img/sprite.svg';
import {
  ArrowIcon,
  BookAuthor,
  BookImage,
  BookListItem,
  BookTitle,
  BooksList,
  HomeLink,
  HomeText,
  RecommendedBooksContainer,
  RecommendedBooksHeading,
} from './RecommendedBooks.styled';
import CustomPortalModal from 'components/CustomPortalModal/CustomPortalModal';
import BookDetails from 'components/BookDetails/BookDetails';

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
      <RecommendedBooksContainer>
        <RecommendedBooksHeading>Recommended books</RecommendedBooksHeading>
        <BooksList>
          {booksData?.slice(3, 6).map(book => (
            <BookListItem key={book._id}>
              <BookImage
                src={book.imageUrl}
                alt="book title"
                onClick={() => openModalHandler(book)}
              />
              <BookTitle>{book.title}</BookTitle>
              <BookAuthor>{book.author}</BookAuthor>
            </BookListItem>
          ))}
        </BooksList>
        <HomeLink to="/recommended">
          <HomeText>Home </HomeText>
          <ArrowIcon>
            <use href={`${sprite}#icon-arrow-right`} />
          </ArrowIcon>
        </HomeLink>
      </RecommendedBooksContainer>

      <CustomPortalModal active={modalOpen} setActive={setModalOpen}>
        <BookDetails
          bookInfo={bookInfo}
          closeModal={() => setModalOpen()}
          buttonLabel="Add to library"
        />
      </CustomPortalModal>
    </div>
  );
};

export default RecommendedBooks;
