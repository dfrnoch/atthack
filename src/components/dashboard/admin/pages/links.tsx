import { Flex, Title, Button, Modal, Text, NumberInput, Table } from "@mantine/core";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { FaClipboard } from "react-icons/fa";
import { api } from "~/utils/api";

const LinksPage = () => {
  const fetchInvites = api.invite.listInvites.useQuery();
  const deleteInvite = api.invite.removeInvite.useMutation({
    onSuccess: () => {
      notifications.show({
        title: "Pozvánky",
        message: "Úspěšně jste upravili pozvámku!",
      });

      fetchInvites.refetch();
    },
  });
  const createInvite = api.invite.createInvite.useMutation({
    onSuccess: () => {
      fetchInvites.refetch();
      close();

      notifications.show({
        title: "Pozvanky",
        message: "Úspěšně jste vytvořili pozvánku!",
      });
    },
  });
  const [opened, { open, close }] = useDisclosure();
  const [data, setData] = useState({
    limit: 0,
    expiresAt: new Date(),
  });

  return (
    <div>
      <Flex gap={15} direction="row">
        <Title size="h3">Pozvánky</Title>

        <Button onClick={open} variant="outline">
          Přidat
        </Button>
      </Flex>

      <Modal opened={opened} onClose={close} title="Přidat pozvánku">
        <DatePickerInput
          mt={10}
          label="Konec platnosti"
          value={data.expiresAt}
          onChange={(date) => setData({ ...data, expiresAt: new Date(date?.getTime() || 0) })}
          placeholder="Vyberte datum"
          mx="auto"
        />

        <NumberInput
          value={data.limit}
          label="Limit požití"
          onChange={(value) => {
            setData({
              ...data,
              limit: value || 0,
            });
          }}
          min={1}
        />

        <Button
          onClick={() => {
            createInvite.mutateAsync({
              expiresAt: data.expiresAt,
              limit: data.limit,
            });
          }}
          loading={createInvite.isLoading}
          mt={18}
        >
          Přidat
        </Button>
      </Modal>

      {fetchInvites.isLoading && <Text>Loading...</Text>}

      <Table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Pouziti</td>
            <td>Vyprsi za</td>
            <td>Akce</td>
          </tr>
        </thead>

        <tbody>
          {fetchInvites.data?.map((el) => {
            return (
              <tr>
                <td className="flex flex-row gap-2 items-center">
                  <FaClipboard
                    className="cursor-pointer text-sky-500 hover:text-sky-600"
                    onClick={() => {
                      navigator.clipboard.writeText(`localhost:3000/invite/${el.id}`);
                      notifications.show({
                        title: "Pozvánky",
                        message: "Odkaz byl zkopírován do schránky!",
                      });
                    }}
                  />
                  {el.id}
                </td>
                <td>{el.used}</td>
                <td>{el.expiresAt ? el.expiresAt.toLocaleDateString() : "Neznámý datum"}</td>
                <td>
                  <Button
                    color="red"
                    variant="outline"
                    loading={deleteInvite.isLoading}
                    onClick={() => {
                      deleteInvite.mutateAsync(el.id);
                    }}
                  >
                    Smazat
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default LinksPage;
