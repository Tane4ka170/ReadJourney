import sprite from '../../img/sprite.svg';
import {
  ArgumentsBlock,
  ArrowSvg,
  Container,
  DescriptionSpan,
  LibraryText,
  LinkTo,
  StartWorkoutTitle,
  StepContainer,
  StepDescription,
  StepNumber,
  TextTwo,
} from './StartWorkout.styled';

export default function StartWorkout() {
  return (
    <Container>
      <StartWorkoutTitle>Start your workout</StartWorkoutTitle>
      <ArgumentsBlock>
        <StepContainer>
          <StepNumber>1</StepNumber>
          <StepDescription>
            Create a personal library:{' '}
            <DescriptionSpan>
              add the books you intend to read to it.
            </DescriptionSpan>
          </StepDescription>
        </StepContainer>
        <StepContainer>
          <StepNumber>2</StepNumber>
          <TextTwo>
            Create your first workout:{' '}
            <DescriptionSpan>
              define a goal, choose a period, start training.
            </DescriptionSpan>
          </TextTwo>
        </StepContainer>
      </ArgumentsBlock>
      <LinkTo to="/library">
        <LibraryText>My library </LibraryText>
        <ArrowSvg>
          <use href={`${sprite}#icon-arrow-right`} />
        </ArrowSvg>
      </LinkTo>
    </Container>
  );
}
