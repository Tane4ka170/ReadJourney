import color from 'global/GlobalColors';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${color.dimmedBackground};
  overflow: auto;
  z-index: 5;
  transition: all 0.3s ease;

  transform: translateY(-100%);
  opacity: 0;

  &.active {
    transform: translateY(0);
    opacity: 1;
  }
`;
