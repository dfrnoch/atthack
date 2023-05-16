import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div style={styles}>
    <SignUp path="/registrace" routing="path" signInUrl="/prihlaseni" />
  </div>
);

export default SignUpPage;

const styles = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
