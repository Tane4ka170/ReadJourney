import React from 'react';
import sprite from '../../img/sprite.svg';
import {
  PaginationButton,
  PaginationContainer,
  PaginationSvg,
} from './Pagination.styled';

export default function Pagination({ totalPages, handlePageChange, page }) {
  return (
    <PaginationContainer>
      <PaginationButton
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <PaginationSvg stoke={page === 1 ? 'true' : ''}>
          <use href={`${sprite}#icon-chevron-left`} />
        </PaginationSvg>
      </PaginationButton>
      <PaginationButton
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        <PaginationSvg stoke={page === totalPages ? 'true' : ''}>
          <use href={`${sprite}#icon-chevron-right`} />
        </PaginationSvg>
      </PaginationButton>
    </PaginationContainer>
  );
}
