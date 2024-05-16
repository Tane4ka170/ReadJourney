import { colors } from 'react-select/dist/declarations/src/theme';
import styled from 'styled-components';

export const ReadingTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  line-height: 1.14;
  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

export const BookContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;

  @media (min-width: 768px) {
    margin-top: 32px;
  }
  @media (min-width: 1440px) {
    margin-top: 44px;
  }
`;

export const BookImage = styled.img`
  width: 137px;
  height: 208px;
  border-radius: 8px;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    width: 169px;
    height: 256px;
    margin-bottom: 25px;
  }
  @media (min-width: 1440px) {
    width: 224px;
    height: 340px;
  }
`;

export const BookTitle = styled.h2`
  text-align: center;
  font-size: 14px;
  margin-bottom: 5px;

  @media (min-width: 768px) {
    font-size: 20px;
    margin-bottom: 4px;
  }
`;

export const BookAuthor = styled.p`
  font-size: 10px;
  color: ${colors.gryeLight};
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 14px;
    margin-bottom: 16px;
  }
  @media (min-width: 1440px) {
    margin-bottom: 25px;
  }
`;

export const ReadingIcon = styled.svg`
  width: 40px;
  height: 40px;

  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;
