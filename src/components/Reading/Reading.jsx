import AlternativeImage from 'components/AlternativeImage/AlternativeImage';
import Block from 'components/Block/Block';
import GeneralMainWrapper from 'components/GeneralMainWrapper/GeneralMainWrapper';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectInfoCurrentBook,
  selectOwnBooks,
} from '../../redux/books/booksSelectors';
import notFoundImg from '../../img/notFoundImg/open-book-desct.jpg';
import sprite from '../../img/sprite.svg';
import {
  BookAuthor,
  BookContainer,
  BookImage,
  BookTitle,
  ReadingIcon,
  ReadingInfo,
  ReadingTitle,
  TimeLeft,
} from './Reading.styled';
import ReadingPanel from 'components/ReadingPanel/ReadingPanel';

export default function Reading() {
  const { bookId } = useParams();
  const books = useSelector(selectOwnBooks);
  const [read, setRead] = useState(false);
  const selectCurrentBookInfo = useSelector(selectInfoCurrentBook);

  const selectedBook = books.find(book => book._id === bookId);

  return (
    <Block>
      <ReadingPanel
        selectedBook={selectedBook._id}
        onReadChange={() => setRead(!read)}
      />

      <GeneralMainWrapper>
        <ReadingInfo>
          <ReadingTitle>My reading</ReadingTitle>
          {selectCurrentBookInfo.timeLeftToRead && (
            <TimeLeft>
              {selectCurrentBookInfo.timeLeftToRead.hours} hours and{' '}
              {selectCurrentBookInfo.timeLeftToRead.minutes} minutes left
            </TimeLeft>
          )}
        </ReadingInfo>
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
