import color from 'global/GlobalColors';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 342px;
  height: 290px;
  background: ${color.blackLight};
  border-radius: 12px;
  padding: 60px 46px;

  @media (min-width: 768px) {
    padding: 49px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  stroke: ${color.blackPrimary};
  background: transparent;
  transition: transform 0.25s linear;
  &:hover,
  &:focus {
    transform: scale(1.1);
  }

  @media (min-width: 768px) {
    right: 16px;
  }
`;
