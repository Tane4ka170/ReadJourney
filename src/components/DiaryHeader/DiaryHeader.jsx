import sprite from '../../img/sprite.svg';
import {
  ButtonContainer,
  HeaderButton,
  HeaderContainer,
  HeaderSvg,
  HeaderTitle,
} from './DiaryHeader.styled';

export default function DiaryHeader({ diaryStat, setDiaryStat }) {
  const handleDiaryStatistic = e => {
    if (e) setDiaryStat(false);
    if (!e) setDiaryStat(true);
  };

  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }

  return (
    <HeaderContainer>
      <HeaderTitle>{diaryStat ? 'Statistic' : 'Diary'}</HeaderTitle>
      <ButtonContainer>
        <HeaderButton onClick={() => handleDiaryStatistic(true)}>
          <HeaderSvg diarystat={diaryStat ? 'true' : ''}>
            <use href={`${sprite}#icon-hourglass`} />
          </HeaderSvg>
        </HeaderButton>
        <HeaderButton onClick={() => handleDiaryStatistic(false)}>
          <HeaderSvg diarystat={diaryStat ? '' : 'true'}>
            <use href={`${sprite}#icon-pie-chart`} />
          </HeaderSvg>
        </HeaderButton>
      </ButtonContainer>
    </HeaderContainer>
  );
}
