import CustomPortalModal from 'components/CustomPortalModal/CustomPortalModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/auth/authOperations';
import { selectUser } from '../../redux/auth/authSelectors';
import sprite from '../../img/sprite.svg';
import { toast } from 'react-toastify';
import {
  AvatarWrapper,
  HeaderContainer,
  HeaderInner,
  LogoutButton,
  MenuToggle,
  NavContainer,
  NavigationLink,
  UserInfoContainer,
  Username,
} from './Header.styled';
import Logo from 'components/Logo/Logo';
import SideNavigation from 'components/SideNavigation/SideNavigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name } = useSelector(selectUser);
  const firstLetterAvatar = name?.slice(0, 1).toUpperCase();

  const handleButtonClick = async () => {
    try {
      await dispatch(logOut()).unwrap();
      navigate('/register');
    } catch (error) {
      toast.error('Logout unsuccessful. An error occurred');
    }
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderInner>
        <Link to="/recommended">
          <Logo />
        </Link>

        <NavContainer>
          <NavigationLink to="/recommended">Home</NavigationLink>
          <NavigationLink to="/library">My library</NavigationLink>
        </NavContainer>

        <UserInfoContainer>
          <AvatarWrapper>{firstLetterAvatar}</AvatarWrapper>
          <Username>{name}</Username>
          <LogoutButton
            label="Log out"
            onClick={handleButtonClick}
            width="114px"
          />
          <MenuToggle onClick={toggleMenu}>
            <svg width={28} height={28}>
              <use href={`${sprite}#icon-menu`} />
            </svg>
          </MenuToggle>
        </UserInfoContainer>
      </HeaderInner>

      <CustomPortalModal active={isMenuOpen} setActive={setIsMenuOpen}>
        <SideNavigation
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      </CustomPortalModal>
    </HeaderContainer>
  );
}
