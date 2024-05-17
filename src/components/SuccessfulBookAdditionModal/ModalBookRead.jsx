import sprite from '../../img/sprite.svg';
import books2x from '../../img/stackBooksAndLike/books-desc@2.png';
import books from '../../img/stackBooksAndLike/books-desc.png';
import mobBooks2x from '../../img/stackBooksAndLike/books-mob@2x.png';
import mobBooks from '../../img/stackBooksAndLike/books-mob.png';
import { CloseButton, ModalContainer } from './ModalBookRead.styled';
import {
  Heading,
  Img,
  LibraryName,
  SuccessMessage,
} from 'components/BookDetails/BookDetails.styled';

export default function ModalBookIsRead({ closeModals }) {
  return (
    <ModalContainer>
      <CloseButton onClick={closeModals}>
        <svg width={22} height={22}>
          <use href={`${sprite}#icon-x`} />
        </svg>
      </CloseButton>
      <picture>
        <source
          srcSet={`${mobBooks} 1x, ${mobBooks2x} 2x`}
          media="(max-width: 767px)"
        />
        <source
          srcSet={`${books} 1x, ${books2x} 2x`}
          media="(min-width: 766px)"
        />

        <Img src={books} alt="stack books" />
      </picture>
      <SuccessMessage>The book is read</SuccessMessage>
      <Heading>
        It was an <LibraryName>exciting journey</LibraryName>, where each page
        revealed new horizons, and the characters became inseparable friends.
      </Heading>
    </ModalContainer>
  );
}
