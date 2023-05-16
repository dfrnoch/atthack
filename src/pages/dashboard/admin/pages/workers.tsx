import { Button, Text, ColorPicker, Flex, Modal, TextInput, Title } from "@mantine/core";
import WorkerGroupCard from "../../../../components/adminDashboard/WorkerGroupCard";
import { useDisclosure } from "@mantine/hooks";

const WorkersPage = () => {
  const [modalOpened, { open, close }] = useDisclosure();

  return (
    <div>
      <Flex gap={15} direction="row">
        <Title size="h3">Skupiny zaměstanců</Title>

        <Button onClick={open} variant="filled">
          Přidat
        </Button>
      </Flex>

      <Modal opened={modalOpened} onClose={close} title="Přidat skupinu">
        <TextInput withAsterisk label="Název skupiny" placeholder="Zadej..." />

        <Text mt={10} mb={5} size={"sm"}>Barva</Text>
        <ColorPicker/>

        <Button mt={15}>Přidat</Button>
      </Modal>

      <WorkerGroupCard
        workerCount={20}
        createdAt={new Date()}
        color="green"
        category="fdklfjd"
        title="flkdjflksd fjsldk f"
      />
    </div>
  );
};

export default WorkersPage;
