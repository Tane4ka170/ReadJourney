import notFoundImgMobile2x from '../../img/notFoundImg/open-book@2x.jpg';
import notFoundImgMobile from '../../img/notFoundImg/open-book.jpg';
import notFoundImg2x from '../../img/notFoundImg/open-book-desct@2x.jpg';
import notFoundImg from '../../img/notFoundImg/open-book-desct.jpg';

export default function AlternativeImage({ children }) {
  return (
    <picture>
      <source
        srcSet={`${notFoundImgMobile} 1x, ${notFoundImgMobile2x} 2x`}
        media="(max-width: 767px)"
      />
      <source
        srcSet={`${notFoundImg} 1x, ${notFoundImg2x} 2x`}
        media="(min-width: 768px)"
      />
      {children}
    </picture>
  );
}
