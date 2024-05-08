import { StyledBtn } from './Btn.styled';

export default function Btn({ className, label, onClick, prop }) {
  return (
    <StyledBtn
      className={className}
      onClick={onClick}
      type="submit"
      prop={prop}
    >
      {label}
    </StyledBtn>
  );
}
