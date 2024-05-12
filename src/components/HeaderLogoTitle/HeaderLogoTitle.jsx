import Logo from 'components/Logo/Logo';
import {
  CustomLogo,
  HighlightedText,
  TitleHeading,
  Wrapper,
} from './HeaderLogoTitle.styled';

export default function HeaderLogoTitle() {
  return (
    <Wrapper>
      <CustomLogo>
        <Logo />
      </CustomLogo>
      <TitleHeading>
        Expand your mind, reading <HighlightedText>a book</HighlightedText>
      </TitleHeading>
    </Wrapper>
  );
}
