import star from '../../img/star/star.png';
import star2x from '../../img/star/srar@2x.png';
import mobStar from '../../img/star/mob-star.png';
import mobStar2x from '../../img/star/mob-star@2x.png';
import {
  PictureContainer,
  ProgressContainer,
  ProgressText,
  ProgressTitle,
  StarImage,
} from './ProgressBoard.styled';

export default function ProgressBoard() {
  return (
    <ProgressContainer>
      <ProgressTitle>Progress</ProgressTitle>
      <ProgressText>
        Here you will see when and how much you read. To record, click on the
        red button above.
      </ProgressText>
      <div>
        <PictureContainer>
          <source
            srcSet={`${mobStar} 1x, ${mobStar2x} 2x`}
            media="(max-width: 767px)"
          />
          <source
            srcSet={`${star} 1x, ${star2x} 2x`}
            media="(min-width: 766px)"
          />

          <StarImage src={star} alt="stack books" />
        </PictureContainer>
      </div>
    </ProgressContainer>
  );
}
