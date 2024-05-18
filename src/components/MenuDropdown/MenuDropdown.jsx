import { useEffect, useRef } from 'react';
import sprite from '../../img/sprite.svg';
import {
  ChevronIcon,
  DropdownContainer,
  OptionItem,
  OptionList,
  ToggleButton,
} from './MenuDropdown.styled';

const options = ['Unread', 'In progress', 'Done', 'All books'];

export default function MenuDropdown({
  selectedBooks,
  handleSelectedBooks,
  isOpen,
  setIsOpen,
}) {
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  const toggleDropdown = event => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = book => {
    handleSelectedBooks(book);
    setIsOpen(false);
  };

  return (
    <DropdownContainer ref={selectRef}>
      <ToggleButton onClick={toggleDropdown}>
        {selectedBooks || 'All books'}
        <ChevronIcon width={16} height={16}>
          <use href={`${sprite}#icon-chevron-${isOpen ? 'upp' : 'down'}`} />
        </ChevronIcon>
      </ToggleButton>
      <OptionList open={isOpen}>
        {options.map(book => (
          <OptionItem key={book} onClick={() => handleOptionClick(book)}>
            {book}
          </OptionItem>
        ))}
      </OptionList>
    </DropdownContainer>
  );
}
