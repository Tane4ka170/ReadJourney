import BookDetails from 'components/BookDetails/BookDetails';
import CustomPortalModal from 'components/CustomPortalModal/CustomPortalModal';
import GeneralMainWrapper from 'components/GeneralMainWrapper/GeneralMainWrapper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ownBooks } from '../../redux/books/booksOperations';
import { selectOwnBooks } from '../../redux/books/booksSelectors';
import { BookList, LibraryContainer, LibraryHeading } from './Books.styled';
import MenuDropdown from 'components/MenuDropdown/MenuDropdown';
import NoBooksScreen from 'components/NoBooksScreen/NoBooksScreen';
import BookItem from 'components/BookItem/BookItem';

export default function Books() {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookData, setBookData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ownLibrary = useSelector(selectOwnBooks);
  const [selectedBooks, setSelectedBooks] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ownBooks());
  }, [dispatch]);

  const openLoginModal = book => {
    setModalOpen(true);
    setBookData(book);
  };

  const handleSelectedBooks = e => {
    setSelectedBooks(e);
    if (e === 'Done') dispatch(ownBooks('done'));
    if (e === 'In progress') dispatch(ownBooks('in-progress'));
    if (e === 'All books') dispatch(ownBooks());
    if (e === 'Unread') dispatch(ownBooks('unread'));
  };

  return (
    <GeneralMainWrapper>
      <LibraryContainer>
        <LibraryHeading>My library</LibraryHeading>
        <MenuDropdown
          selectedBooks={selectedBooks}
          handleSelectedBooks={handleSelectedBooks}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </LibraryContainer>

      {ownLibrary.length === 0 ? (
        <NoBooksScreen purt="MyLibraryBooks" />
      ) : (
        <BookList>
          {Array.isArray(ownLibrary) &&
            ownLibrary.map(book => (
              <BookItem
                key={book._id}
                book={book}
                openLoginModal={openLoginModal}
                currentPage="MyLibrary"
              />
            ))}
        </BookList>
      )}

      <CustomPortalModal active={modalOpen} setActive={setModalOpen}>
        <BookDetails
          bookData={bookData}
          closeModals={() => setModalOpen()}
          btnLabel="Start reading"
        />
      </CustomPortalModal>
    </GeneralMainWrapper>
  );
}
