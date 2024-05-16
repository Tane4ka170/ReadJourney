import Block from 'components/Block/Block';
import BookDetails from 'components/BookDetails/BookDetails';
import BookItem from 'components/BookItem/BookItem';
import CustomPortalModal from 'components/CustomPortalModal/CustomPortalModal';
import GeneralMainWrapper from 'components/GeneralMainWrapper/GeneralMainWrapper';
import NoBooksScreen from 'components/NoBooksScreen/NoBooksScreen';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from 'redux/books/booksOperations';
import { selectBookData, selectTotalPage } from 'redux/books/booksSelectors';
import { ListContainer, SectionContainer } from './Recommended.styled';
import { LibraryHeading } from 'components/Books/Books.styled';
import RecomendedDashboard from 'components/RecommendedDashboard/RecommendedDashboard';
import Pagination from 'components/Pagination/Pagination';

const calculateLimit = width => {
  if (width < 768) {
    return 2;
  } else if (width >= 768 && width < 1440) {
    return 8;
  } else {
    return 10;
  }
};

export default function Recommended() {
  const dispatch = useDispatch();
  const results = useSelector(selectBookData);
  const totalPages = useSelector(selectTotalPage);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookData, setBookData] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(calculateLimit(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newLimit = calculateLimit(newWidth);
      setLimit(newLimit);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchBooks({ page, limit }));
  }, [dispatch, page, limit]);

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const openLoginModal = book => {
    setModalOpen(true);
    setBookData(book);
  };

  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }

  return (
    <Block>
      <RecomendedDashboard />

      <GeneralMainWrapper>
        <SectionContainer>
          <LibraryHeading>Recommended</LibraryHeading>
          <Pagination
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            page={page}
          />
        </SectionContainer>

        <ListContainer>
          {results?.map(book => (
            <BookItem
              key={book._id}
              book={book}
              openLoginModal={openLoginModal}
            />
          ))}
        </ListContainer>
        {!results.length && <NoBooksScreen purt="Recomended" />}
      </GeneralMainWrapper>

      <CustomPortalModal active={modalOpen} setActive={setModalOpen}>
        <BookDetails
          bookData={bookData}
          closeModals={() => setModalOpen()}
          btnLabel="Add to library"
        />
      </CustomPortalModal>
    </Block>
  );
}
