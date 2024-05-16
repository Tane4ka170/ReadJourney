import AlternativeImage from 'components/AlternativeImage/AlternativeImage';
import Block from 'components/Block/Block';
import GeneralMainWrapper from 'components/GeneralMainWrapper/GeneralMainWrapper';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectOwnBooks } from 'redux/books/booksSelectors';
import notFoundImg from '../../img/notFoundImg/open-book-desct.jpg';
import sprite from '../../img/sprite.svg';
import {
  BookAuthor,
  BookContainer,
  BookImage,
  BookTitle,
  ReadingIcon,
  ReadingTitle,
} from './Reading.styled';

export default function Reading() {
  const { bookId } = useParams();
  const books = useSelector(selectOwnBooks);
  const [read, setRead] = useState(false);

  const selectedBook = books.find(book => book._id === bookId);

  return (
    <Block>
      {/* <ReadingDashboard
        selectedBook={selectedBook._id}
        onReadChange={e => setRead(!e)}
      /> */}

      <GeneralMainWrapper>
        <ReadingTitle>My reading</ReadingTitle>
        <BookContainer>
          {selectedBook.imageUrl ? (
            <BookImage src={selectedBook.imageUrl} alt="title" />
          ) : (
            <AlternativeImage>
              <BookImage src={notFoundImg} alt="title" />
            </AlternativeImage>
          )}

          <BookTitle>{selectedBook.title}</BookTitle>
          <BookAuthor>{selectedBook.author}</BookAuthor>
          {read ? (
            <ReadingIcon>
              <use href={`${sprite}#icon-block-start`} />
            </ReadingIcon>
          ) : (
            <ReadingIcon>
              <use href={`${sprite}#icon-block-pause`} />
            </ReadingIcon>
          )}
        </BookContainer>
      </GeneralMainWrapper>
    </Block>
  );
}
