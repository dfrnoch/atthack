import {
  Button,
  Text,
  ColorPicker,
  Flex,
  Modal,
  TextInput,
  Title,
  MultiSelect,
  Box,
  Paper,
  Table,
  Badge,
} from "@mantine/core";
import WorkerGroupCard from "../../../adminDashboard/WorkerGroupCard";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { api } from "~/utils/api";
import { CompanyWorkerGroup } from "@prisma/client";
import { FaArrowLeft } from "react-icons/fa";

const WorkersPage = () => {
  const [modalOpened, { open, close }] = useDisclosure();
  const groups = api.company.fetchWorkerGroups.useQuery();
  const [selectedGroup, setSelectedGroup] = useState<CompanyWorkerGroup | null>(null);
  const workers = api.company.fetchGroupWorkers.useQuery(selectedGroup?.id || "");
  const createGroup = api.company.addWorkerGroup.useMutation({
    onSuccess: async () => {
      close();
      await groups.refetch();
    },
  });
  const deleteWorkerGroup = api.company.removeWorkerGroup.useMutation({
    onSuccess: async () => {
      setSelectedGroup(null);
      await groups.refetch();
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
            <Title size="h3">Skupiny zaměstnanců</Title>

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
              placeholder="Zadejte..."
            />

            <Text mt={10} mb={5} size={"sm"}>
              Barva
            </Text>
            <ColorPicker
              value={createGroupData.color}
              onChange={(color) => setCreateGroupData({ ...createGroupData, color })}
            />

            <Button mt={15} loading={createGroup.isLoading} onClick={() => createGroup.mutateAsync(createGroupData)}>
              Přidat
            </Button>
          </Modal>

          <Paper p={15} variant="outlined" withBorder mt={20}>
            <Flex direction="row" wrap="wrap" gap={18}>
              {groups.data?.map((el) => {
                return (
                  <WorkerGroupCard
                    workerCount={el.workers}
                    createdAt={el.createdAt}
                    color={el.color}
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

          <Table mt={20}>
            <thead>
              <tr>
                <td>ID</td>
                <td>Jméno</td>
                <td>Role</td>
              </tr>
            </thead>

            <tbody>
              {workers.data?.workers.map((el) => {
                return (
                  <tr>
                    <td>{el.id}</td>
                    <td>{el.User.name}</td>
                    <td>
                      <Badge>{el.User.role}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default WorkersPage;
