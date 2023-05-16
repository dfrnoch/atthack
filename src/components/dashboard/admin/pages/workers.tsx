import { Button, Text, ColorPicker, Flex, Modal, TextInput, Title, MultiSelect, Box, Paper } from "@mantine/core";
import WorkerGroupCard from "../../../adminDashboard/WorkerGroupCard";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { api } from "~/utils/api";
import { CompanyWorkerGroup } from "@prisma/client";
import { FaArrowLeft } from "react-icons/fa";

const WorkersPage = () => {
  const [modalOpened, { open, close }] = useDisclosure();
  const fetchUsersToAdd = api.company.fetchUsers.useQuery();
  const workers = api.company.fetchWorkerGroups.useQuery();
  const [selectedGroup, setSelectedGroup] = useState<CompanyWorkerGroup | null>(null);
  const createGroup = api.company.addWorkerGroup.useMutation({
    onSuccess: async () => {
      close();
      await workers.refetch();
    },
  });
  const deleteWorkerGroup = api.company.removeWorkerGroup.useMutation({
    onSuccess: async () => {
      setSelectedGroup(null);
      await workers.refetch();
    },
  });
  const [createGroupData, setCreateGroupData] = useState({
    name: "",
    color: "",
  });

  return (
    <div>
      {!selectedGroup ? (
        <>
          <Flex gap={15} direction="row">
            <Title size="h3">Skupiny zaměstanců</Title>

            <Button onClick={open} variant="outline">
              Přidat
            </Button>
          </Flex>
          <Modal opened={modalOpened} onClose={close} title="Pridat skupinu">
            <TextInput
              value={createGroupData.name}
              onChange={(e) => setCreateGroupData({ ...createGroupData, name: e.target.value })}
              withAsterisk
              label="Nazev skupiny"
              placeholder="Zadej..."
            />

            <Text mt={10} mb={5} size={"sm"}>
              Barva
            </Text>
            <ColorPicker
              value={createGroupData.color}
              onChange={(color) => setCreateGroupData({ ...createGroupData, color })}
            />

            <Button mt={15} loading={createGroup.isLoading} onClick={() => createGroup.mutateAsync(createGroupData)}>
              Pridat
            </Button>
          </Modal>

          <Paper p={15} variant="outlined" withBorder mt={20}>
            <Flex direction="row" wrap="wrap" gap={18}>
              {workers.data?.map((el) => {
                return (
                  <WorkerGroupCard
                    workerCount={el.workers}
                    createdAt={el.createdAt}
                    color={el.color}
                    category="Nic"
                    title={el.name}
                    onClick={() => setSelectedGroup(el)}
                  />
                );
              })}
            </Flex>
          </Paper>
        </>
      ) : (
        <>
          <Flex gap={15} direction="row">
            <FaArrowLeft color="gray" onClick={() => setSelectedGroup(null)} cursor="pointer" size={25} />
            <Title size="h3">Skupina {selectedGroup.name}</Title>

            <Button
              color="red"
              onClick={() => deleteWorkerGroup.mutateAsync(selectedGroup.id)}
              variant="outline"
              loading={deleteWorkerGroup.isLoading}
            >
              Smazat
            </Button>
          </Flex>
        </>
      )}
    </div>
  );
};

export default WorkersPage;
