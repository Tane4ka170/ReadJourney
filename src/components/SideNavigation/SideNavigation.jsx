import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logOut } from '../../redux/auth/authOperations';
import sprite from '../../img/sprite.svg';
import { NavigationLink } from 'components/Header/Header.styled';
import Btn from 'components/Btn/Btn';
import {
  CloseButton,
  LinksContainer,
  MenuContainer,
} from './SideNavigation.styled';

export default function SideNavigation({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    try {
      await dispatch(logOut()).unwrap();
      navigate('/register');
    } catch (error) {
      toast.error('Logout unsuccessful. An error occurred');
    }
  };

  return (
    <MenuContainer open={isOpen}>
      <CloseButton onClick={onClose}>
        <svg width={28} height={28}>
          <use href={`${sprite}#icon-x`} />
        </svg>
      </CloseButton>

      <LinksContainer>
        <NavigationLink to="/recommended">Home</NavigationLink>
        <NavigationLink to="/library">My library</NavigationLink>
      </LinksContainer>

      <div>
        <Btn label="Log out" onClick={handleButtonClick} />
      </div>
    </MenuContainer>
  );
}
