import { Button, Text, ColorPicker, Flex, Modal, TextInput, Title } from "@mantine/core";
import WorkerGroupCard from "../../../../components/adminDashboard/WorkerGroupCard";
import { useDisclosure } from "@mantine/hooks";

const WorkersPage = () => {
  const [modalOpened, { open, close }] = useDisclosure();

  return (
    <div>
      <Flex gap={15} direction="row">
        <Title size="h3">Skupiny zamestancu</Title>

        <Button onClick={open} variant="filled">
          Pridat
        </Button>
      </Flex>

      <Modal opened={modalOpened} onClose={close} title="Pridat skupinu">
        <TextInput withAsterisk label="Nazev skupiny" placeholder="Zadej..." />

        <Text mt={10} mb={5} size={"sm"}>Barva</Text>
        <ColorPicker/>

        <Button mt={15}>Pridat</Button>
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
