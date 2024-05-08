import color from 'global/GlobalColors';
import styled, { keyframes } from 'styled-components';

const growAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
`;

export const StyledBtn = styled.button`
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 2%;
  padding: ${props => (props.prop === 'true' ? '12px 24px' : '10px 20px')};
  border: 1px solid ${color.whiteLightTranslucent};
  border-radius: 30px;
  background: transparent;
  transition: all 0.3s;

  &:hover,
  &:focus {
    color: ${color.blackLight};
    background: ${color.whitePrimary};
    animation: ${growAnimation} 0.3s forwards;
  }

  @media (min-width: 768px) {
    font-size: 16px;
    padding: ${props => (props.prop === 'true' ? '14px 28px' : '12px 28px')};
  }
`;
