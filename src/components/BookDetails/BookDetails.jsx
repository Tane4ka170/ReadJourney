import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addBookById, ownBooks } from 'redux/books/booksOperations';
import { selectOwnBooks } from 'redux/books/booksSelectors';
import sprite from '../../img/sprite.svg';
import notFoundImg from '../../img/notFoundImg/open-book-desct.jpg';
import Btn from 'components/Btn/Btn';
import AlternativeImage from 'components/AlternativeImage/AlternativeImage';
import {
  AuthorInfo,
  CoverImage,
  PageCount,
  StyledModal,
  Title,
} from './BookDetails.styled';

export default function BookDetails({
  closeModal,
  bookData,
  actionButtonLabel,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ownLibrary = useSelector(selectOwnBooks);

  useEffect(() => {
    dispatch(ownBooks());
  }, [dispatch]);

  const handleActionButtonClick = () => {
    if (actionButtonLabel === 'Add to Library') {
      const bookExists = ownLibrary.find(item => item.title === bookData.title);
      if (!bookExists) {
        toast.success('The addition of the book was successful');
        dispatch(addBookById(bookData._id));
      } else {
        toast.error('The book has already been added to the library');
      }
    }

    if (actionButtonLabel === 'Start Reading') {
      navigate(`/reading/${bookData._id}`);
    }

    closeModal();
  };

  return (
    <StyledModal>
      <button onClick={closeModal}>
        <svg width={22} height={22}>
          <use href={`${sprite}#icon-x`} />
        </svg>
      </button>

      {bookData.imageUrl ? (
        <CoverImage src={bookData.imageUrl} alt="cover" />
      ) : (
        <AlternativeImage>
          <CoverImage src={notFoundImg} alt="cover fallback" />
        </AlternativeImage>
      )}

      <Title>{bookData.title}</Title>
      <AuthorInfo>{bookData.author}</AuthorInfo>
      <PageCount>{bookData.totalPages} pages</PageCount>

      <Btn
        label={actionButtonLabel}
        onClick={handleActionButtonClick}
        prop="true"
      />
    </StyledModal>
  );
}
