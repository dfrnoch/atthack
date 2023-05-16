import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div style={styles}>
    <SignIn path="/prihlaseni" routing="path" signUpUrl="/registrace" />
  </div>
);

export default SignInPage;

const styles = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
