import {
  ActionButton,
  ActionLink,
} from './AuthorizationSubmissionBlock.styled';

export default function LoginSubmissionBlock() {
  return (
    <div>
      <ActionButton type="submit" log="login">
        Log In
      </ActionButton>
      <ActionLink to="/register">Don't have an account?</ActionLink>
    </div>
  );
}
