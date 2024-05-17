import sprite from '../../img/sprite.svg';
import likeDesktop2x from '../../img/stackBooksAndLike/like-desc@2x.png';
import likeDesktop from '../../img/stackBooksAndLike/like-desc.png';
import likeMobile2x from '../../img/stackBooksAndLike/like-mob@2x.png';
import likeMobile from '../../img/stackBooksAndLike/like-mob.png';
import {
  Heading,
  Img,
  LibraryName,
  SuccessMessage,
} from 'components/BookDetails/BookDetails.styled';
import { CloseButton, ModalContainer } from './ModalBookRead.styled';

export default function SuccessfulBookAdditionModal({ closeModals }) {
  return (
    <ModalContainer>
      <CloseButton onClick={closeModals}>
        <svg width={22} height={22}>
          <use href={`${sprite}#icon-x`} />
        </svg>
      </CloseButton>
      <picture>
        <source
          srcSet={`${likeMobile} 1x, ${likeMobile2x} 2x`}
          media="(max-width: 767px)"
        />
        <source
          srcSet={`${likeDesktop} 1x, ${likeDesktop2x} 2x`}
          media="(min-width: 768px)"
        />
        <Img src={likeDesktop} alt="add book" />
      </picture>
      <SuccessMessage>Good job</SuccessMessage>
      <Heading>
        Your book is now in <LibraryName>the library!</LibraryName> The joy
        knows no bounds and now you can start your training
      </Heading>
    </ModalContainer>
  );
}
