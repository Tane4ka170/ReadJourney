import desktopImg from '../../img/fon/desctop-block.jpg';
import desktopImg2x from '../../img/fon/desctop-block@2x.jpg';
import mobileImg from '../../img/fon/mob-block.jpg';
import mobileImg2x from '../../img/fon/mob-block@2x.jpg';
import { MainImage } from './AuthorizationImage.styled';

export default function AuthorizationImage() {
  return (
    <picture>
      <source
        srcSet={`${mobileImg} 1x, ${mobileImg2x} 2x`}
        media="(max-width: 767px)"
      />
      <source
        srcSet={`${desktopImg} 1x, ${desktopImg2x} 2x`}
        media="(min-width: 1440px)"
      />
      <MainImage src={desktopImg} alt="register img" />
    </picture>
  );
}
