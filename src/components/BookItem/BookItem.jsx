import sprite from '../../img/sprite.svg';
import notFoundImg from '../../img/notFoundImg/open-book-desct.jpg';
import { useDispatch } from 'react-redux';
import { deleteBook } from 'redux/books/booksOperations';
import AlternativeImage from 'components/AlternativeImage/AlternativeImage';
import {
  Author,
  BookImage,
  DeleteButton,
  DetailsContainer,
  ListItem,
  Title,
} from './BookItem.styled';
import BookDetails from 'components/BookDetails/BookDetails';

export default function BookItem({
  book,
  openLoginModal,
  currentPage = false,
}) {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteBook(book._id));
  };

  return (
    <ListItem>
      {book.imageUrl ? (
        <BookImage
          src={book.imageUrl}
          alt="book title"
          onClick={() => openLoginModal(book)}
        />
      ) : (
        <AlternativeImage>
          <BookImage
            src={notFoundImg}
            alt="book title"
            onClick={() => openLoginModal(book)}
          />
        </AlternativeImage>
      )}
      <DetailsContainer>
        <BookDetails page={currentPage === 'MyLibrary' ? 'true' : ''}>
          <Title>{book.title}</Title>
          <Author>{book.author}</Author>
        </BookDetails>

        {currentPage === 'MyLibrary' && (
          <DeleteButton onClick={handleDeleteClick}>
            <svg width={28} height={28}>
              <use href={`${sprite}#icon-dell`} />
            </svg>
          </DeleteButton>
        )}
      </DetailsContainer>
    </ListItem>
  );
}
