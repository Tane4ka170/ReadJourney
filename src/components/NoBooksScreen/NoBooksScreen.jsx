import imgBooksDesc from '../../img/stackBooksAndLike/books-desc.png';
import imgBooksDesc2x from '../../img/stackBooksAndLike/books-desc@2.png';
import imgBooksMob from '../../img/stackBooksAndLike/books-mob.png';
import imgBooksMob2x from '../../img/stackBooksAndLike/books-mob@2x.png';
import {
  Container,
  ErrorText,
  Img,
  Message,
  Picture,
} from './NoBooksScreen.styled';

export default function NoBooksScreen({ purt }) {
  return (
    <Container>
      <Picture>
        <source
          srcSet={`${imgBooksMob} 1x, ${imgBooksMob2x} 2x`}
          media="(max-width: 767px)"
        />
        <source
          srcSet={`${imgBooksDesc} 1x, ${imgBooksDesc2x} 2x`}
          media="(min-width: 766px)"
        />
        <Img src={imgBooksDesc} alt="stack books" />
      </Picture>

      {purt === 'Recomended' && (
        <Message>
          Oops <ErrorText>unfortunately</ErrorText> nothing was found
        </Message>
      )}
      {purt === 'MyLibraryBooks' && (
        <Message>
          To start training, add <ErrorText>some of your books</ErrorText> or
          from the recommended ones
        </Message>
      )}
    </Container>
  );
}
