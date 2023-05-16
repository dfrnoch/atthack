import { Button, Text, ColorPicker, Flex, Modal, TextInput, Title } from "@mantine/core";
import WorkerGroupCard from "../../../../components/adminDashboard/WorkerGroupCard";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { api } from "~/utils/api";

const WorkersPage = () => {
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
        <Title size="h3">Skupiny zaměstanců</Title>

        <Button onClick={open} variant="filled">
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

        <Button 
            mt={15}
            loading={createGroup.isLoading}
            onClick={() => createGroup.mutateAsync(createGroupData)}
        >
            Pridat
        </Button>
      </Modal>

      <WorkerGroupCard
              workerCount={20}
              createdAt={new Date()}
              color="green"
              category="fdklfjd"
              title="flkdjflksd fjsldk f" onClick={function (): void {
                  throw new Error("Function not implemented.");
              } }      />
    </div>
  );
};

export default WorkersPage;
