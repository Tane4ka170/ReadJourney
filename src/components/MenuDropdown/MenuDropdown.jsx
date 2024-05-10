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
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setIsOpen]);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <DropdownContainer onClick={toggleDropdown} ref={selectRef}>
      <ChevronIcon width={16} height={16}>
        <use href={`${sprite}#icon-chevron-${isOpen ? 'upp' : 'down'}`} />
      </ChevronIcon>
      <ToggleButton>{selectedBooks || 'All books'}</ToggleButton>
      <OptionList open={isOpen}>
        {options.map(book => (
          <OptionItem
            key={book}
            value={book}
            onClick={() => handleSelectedBooks(book)}
          >
            {book}
          </OptionItem>
        ))}
      </OptionList>
    </DropdownContainer>
  );
}
