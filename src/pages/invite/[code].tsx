import { Button, Center, Container, Modal, Skeleton, Space, Title } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import UserWelcomeModal from "~/components/UserWelcomeModal";

const InvitePage = () => {
  const session = useSession();
  const router = useRouter();

  const [openRegistration, setOpenRegistration] = useState(false);

  const inviteData = api.invite.getInviteInfo.useQuery(router.query.code as string);
  const acceptInvite = api.invite.acceptInvite.useMutation();

  return (
    <Container className="h-screen">
      <Center className="h-full">
        <div className="flex flex-col items-center gap-6">
          <Title className="text-2xl">Obdrželi jste pozvánku.</Title>

          {(inviteData.status === "loading" && <Skeleton width={100} height={15} />) ||
            (inviteData.data &&
              ((session.status !== "authenticated" && (
                <Button variant="filled" onClick={() => signIn()}>
                  Přihlásit se
                </Button>
              )) || (
                <div className="w-full">
                  <Button
                    variant="filled"
                    onClick={() => {
                      setOpenRegistration(true);
                      acceptInvite.mutateAsync(inviteData.data?.id || "");
                    }}
                  >
                    Přijmout pozvánku
                  </Button>
                </div>
              ))) || <div className="text-center">Neplatná pozvánka!</div>}
        </div>
      </Center>
      <Modal
        opened={openRegistration}
        onClose={() => setOpenRegistration(false)}
        title={`Připojte se k ${inviteData.data?.Company.name}`}
      >
        {inviteData.data && <UserWelcomeModal invite={inviteData.data} />}
      </Modal>
    </Container>
  );
};

export default InvitePage;
