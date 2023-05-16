import { Flex, Title, Button, Modal, TextInput, NumberInput, Table } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { api } from "~/utils/api";

const LinksPage = () => {
  const fetchInvites = api.invite.listInvites.useQuery();
  const deleteInvite = api.invite.removeInvite.useMutation({
    onSuccess: () => {
      fetchInvites.refetch();
    }
  });
  const createInvite = api.invite.createInvite.useMutation({
    onSuccess: () => {
      fetchInvites.refetch();
      close();
    }
  });
  const [opened, { open, close }] = useDisclosure();
  const [data, setData] = useState({
    limit: 0,
    expiresAt: new Date()
  });

  return (
    <div>
      <Flex gap={15} direction="row">
        <Title size="h3">Pozvánky</Title>

        <Button onClick={open} variant="filled">
          Přidat
        </Button>
      </Flex>

      <Modal opened={opened} onClose={close} title="Přidat pozvanku">
        <NumberInput
            value={data.limit}
            onChange={(value) => {
                setData({
                    ...data,
                    limit: value || 0
                });
            }}
            min={1}
        />

        <DateTimePicker
            mt={10} 
            label="Konec platnosti" 
            value={data.expiresAt}
            onChange={(date) => setData({...data, expiresAt: new Date(date?.getTime() || 0)})}
            placeholder="Vyber datum"
            mx="auto" 
        />

        <Button
          onClick={() => {
            createInvite.mutateAsync({
              expiresAt: data.expiresAt,
              limit: data.limit
            });
          }}
          loading={createInvite.isLoading}
          mt={18}
        >
          Přidat
        </Button>
      </Modal>

      <Table w={700} mt={20}>
        <thead>
          <tr>
            <td>Kod</td>
            <td>Pouziti</td>
            <td>Vyprsi v</td>
            <td>Akce</td>
          </tr>
        </thead>

        <tbody>
          {fetchInvites.data?.map(el => {
            return (
              <tr>
                <td>{el.id}</td>
                <td>{el.used}</td>
                <td>{el.expiresAt ? el.expiresAt.toLocaleDateString() : "Datum nezadano"}</td>
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
            )
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default LinksPage;
