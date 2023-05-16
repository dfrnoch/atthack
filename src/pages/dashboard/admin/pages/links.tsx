import { Flex, Title, Button, Modal, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";

const LinksPage = () => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <div>
      <Flex gap={15} direction="row">
        <Title size="h3">Pozvánky</Title>

        <Button onClick={open} variant="filled">
          Přidat
        </Button>
      </Flex>

      <Modal opened={opened} onClose={close} title="Přidat pozvanku">
        <TextInput label="Název pozvánky" placeholder="Zadej..." />

        <DateTimePicker 
            mt={10} 
            label="Začátek platnosti"
            placeholder="Vyber datum"
            maw={400} 
            mx="auto" 
        />

        <DateTimePicker 
            mt={10} 
            label="Konec platnosti" 
            placeholder="Vyber datum" 
            maw={400} 
            mx="auto" 
        />

        <Button mt={15}>Přidat</Button>
      </Modal>
    </div>
  );
};

export default LinksPage;
