import Btn from 'components/Btn/Btn';
import color from 'global/GlobalColors';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;

  @media (min-width: 768px) {
    padding-top: 32px;
  }
`;
export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  width: 335px;
  height: 57px;
  background: ${color.blackLight};
  border-radius: 15px;
  padding: 11px 20px;

  @media (min-width: 768px) {
    width: 704px;
    height: 74px;
    padding: 16px;
  }
  @media (min-width: 1440px) {
    width: 1216px;
  }
`;

export const NavContainer = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: block;
    margin-left: 223px;
  }
  @media (min-width: 1440px) {
    margin-left: 332px;
  }
`;

export const NavigationLink = styled(NavLink)`
  position: relative;
  padding: 10px 2px;
  font-size: 14px;
  line-height: 1.13;
  color: ${color.gryeLight};

  transition: color 0.2s linear;
  &:hover,
  &:focus {
    color: ${color.focusColor};
  }

  &.active {
    color: ${color.whitePrimary};
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      background-color: ${color.blue};
      border-radius: 2px;
      left: 50%;
      transform: translateX(-50%);
      top: 79%;
    }

    &:hover {
      color: ${color.focusColor};
    }
  }
  &:not(:last-child) {
    @media (min-width: 768px) {
      margin-right: 32px;
      padding: 20px 2px;
    }
    @media (min-width: 1440px) {
      margin-right: 40px;
    }
  }
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid rgba(249, 249, 249, 0.2);
  background: ${color.gryeBlack};
  margin-right: 10px;

  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
    margin-right: 16px;
  }
  @media (min-width: 1440px) {
    margin-right: 8px;
  }
`;

export const Username = styled.p`
  display: none;

  @media (min-width: 1440px) {
    display: block;
    font-size: 16px;
    font-weight: 700;
    margin-right: 16px;
  }
`;

export const LogoutButton = styled(Btn)`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;
export const MenuToggle = styled.button`
  background: transparent;
  scale: 1;
  margin: auto 0;
  transition: scale 0.25s linear;
  &:hover,
  &:focus {
    scale: 1.1;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
