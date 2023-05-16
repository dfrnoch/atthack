import { Flex, Title, Button, Modal, Text, NumberInput, Table } from "@mantine/core";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { api } from "~/utils/api";

const LinksPage = () => {
  const fetchInvites = api.invite.listInvites.useQuery();
  const deleteInvite = api.invite.removeInvite.useMutation({
    onSuccess: () => {
      fetchInvites.refetch();
    },
  });
  const createInvite = api.invite.createInvite.useMutation({
    onSuccess: () => {
      fetchInvites.refetch();
      close();
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

        <DatePickerInput
          mt={10}
          label="Konec platnosti"
          value={data.expiresAt}
          onChange={(date) => setData({ ...data, expiresAt: new Date(date?.getTime() || 0) })}
          placeholder="Vyberte datum"
          mx="auto"
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

      <tbody>
        {fetchInvites.data?.map((el) => {
          return (
            <tr>
              <td>{el.id}</td>
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
    </div>
  );
};

export default LinksPage;
