import {
  ActionButton,
  ActionLink,
} from './AuthorizationSubmissionBlock.styled';

export default function RegistrationSubmissionBlock() {
  return (
    <div>
      <ActionButton type="submit">Registration</ActionButton>
      <ActionLink to="/login">Already have an account?</ActionLink>
    </div>
  );
}
