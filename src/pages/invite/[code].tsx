import { Button, Center, Container, Space, Title } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

const InvitePage = () => {
  const session = useSession();
  const router = useRouter();

  const inviteData = api.invite.getInviteInfo.useQuery(router.query.code as string);

  return (
    <Container className="h-screen">
      <Center className="h-full">
        <div className="flex flex-col items-center gap-6">
          <Title className="text-2xl">Pozvanka</Title>

          {(session.status !== "authenticated" && (
            <Button variant="filled" onClick={() => signIn()}>
              Přihlásit se
            </Button>
          )) || <div className="w-full">cau p</div>}
        </div>
      </Center>
    </Container>
  );
};

export default InvitePage;
