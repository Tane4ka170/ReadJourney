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
  const [bookData, setBookData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const userLibrary = useSelector(selectOwnBooks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ownBooks(selectedCategory));
  }, [dispatch, selectedCategory]);

  const openBookModal = book => {
    setModalOpen(true);
    setBookData(book);
  };

  const handleSelectedCategory = category => {
    setSelectedCategory(category);
  };

  return (
    <GeneralMainWrapper>
      <LibraryContainer>
        <LibraryHeading>My library</LibraryHeading>
        <MenuDropdown
          selectedCategory={selectedCategory}
          handleSelectedCategory={handleSelectedCategory}
        />
      </LibraryContainer>

      {userLibrary.length === 0 ? (
        <NoBooksScreen purpose="UserLibraryBooks" />
      ) : (
        <BookList>
          {userLibrary.map(book => (
            <BookItem
              key={book._id}
              book={book}
              openBookModal={openBookModal}
              currentPage="MyLibrary"
            />
          ))}
        </BookList>
      )}

      <CustomPortalModal active={modalOpen} setActive={setModalOpen}>
        <BookDetails
          bookData={bookData}
          closeModals={() => setModalOpen(false)}
          btnLabel="Start Reading"
        />
      </CustomPortalModal>
    </GeneralMainWrapper>
  );
}
