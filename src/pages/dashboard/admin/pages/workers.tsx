import { Button, Text, ColorPicker, Flex, Modal, TextInput, Title, Table, Checkbox, rem } from "@mantine/core";
import WorkerGroupCard from "../../../../components/adminDashboard/WorkerGroupCard";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { api } from "~/utils/api";

const Groups = ({ onSelect }: { onSelect: () => void }) => {
  const [modalOpened, { open, close }] = useDisclosure();
  const createGroup = api.company.addWorkerGroup.useMutation({
    onSuccess: () => {
        close();
    }
  });
  const [createGroupData, setCreateGroupData] = useState({
    name: "",
    color: ""
  });

  return (
    <div>
      <Flex gap={15} direction="row">
        <Title size="h3">Skupiny zamestancu</Title>

        <Button onClick={open} variant="filled">
          Pridat
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

        <Button 
            mt={15}
            loading={createGroup.isLoading}
            onClick={() => createGroup.mutateAsync(createGroupData)}
        >
            Pridat
        </Button>
      </Modal>

      <Flex direction="row" wrap="wrap" gap={18} mt={20}>
        <WorkerGroupCard
          onClick={onSelect}
          workerCount={20}
          createdAt={new Date()}
          color="green"
          category="fdklfjd"
          title="flkdjflksd fjsldk f"
        />
        <WorkerGroupCard
          onClick={onSelect}
          workerCount={20}
          createdAt={new Date()}
          color="green"
          category="fdklfjd"
          title="flkdjflksd fjsldk f"
        />
        <WorkerGroupCard
          onClick={onSelect}
          workerCount={20}
          createdAt={new Date()}
          color="green"
          category="fdklfjd"
          title="flkdjflksd fjsldk f"
        />
        <WorkerGroupCard
          onClick={onSelect}
          workerCount={20}
          createdAt={new Date()}
          color="green"
          category="fdklfjd"
          title="flkdjflksd fjsldk f"
        />
        <WorkerGroupCard
          onClick={onSelect}
          workerCount={20}
          createdAt={new Date()}
          color="green"
          category="fdklfjd"
          title="flkdjflksd fjsldk f"
        />
      </Flex>
    </div>
  );
};

const Users = () => {
  return (
    <Table miw={800} verticalSpacing="sm">
      <thead>
        <tr>
          <th style={{ width: rem(40) }}>
            <Checkbox

            />
          </th>
          <th>User</th>
          <th>Email</th>
          <th>Job</th>
          <th>Akce</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td><Checkbox/></td>
            <td>sdflkjsdf</td>
            <td>sdflkjsdf</td>
            <td>sdflkjsdf</td>
            <td>
                <Button color="red" variant="outline">Smazat</Button>
                <Button className="ml-2" color="blue" variant="outline">Upravit</Button>
            </td>
        </tr>
      </tbody>
    </Table>
  );
};

const WorkersPage = () => {
  const [page, setPage] = useState<"GROUP" | "USERS">("GROUP");

  if (page === "GROUP") {
    return <Groups onSelect={() => setPage("USERS")} />;
  } else {
    return <Users />;
  }
};

export default WorkersPage;
