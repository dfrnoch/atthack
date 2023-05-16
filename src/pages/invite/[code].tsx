import { Button, Center, Container, Space, Title } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";

const InvitePage = () => {
  const session = useSession();


  //
  return (
    <Container className="h-screen">
      <Center className="h-full">
        <div className="flex flex-col items-center gap-6">
          <Title className="text-2xl">Pozvanka</Title>

          {session.status !== "authenticated" && (
            <Button variant="filled" onClick={() => signIn()}>
              Přihlásit se
            </Button>
          )}
        </div>
      </Center>
    </Container>
  );
};

export default InvitePage;
