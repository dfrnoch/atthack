import { Flex, Title, Button, Modal, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";

const LinksPage = () => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <div>
      <Flex gap={15} direction="row">
        <Title size="h3">Pozvanky</Title>

        <Button onClick={open} variant="filled">
          Pridat
        </Button>
      </Flex>

      <Modal opened={opened} onClose={close} title="Pridat pozvanku">
        <TextInput label="Nazev pozvanky" placeholder="Zadej..." />

        <DateTimePicker 
            mt={10} 
            label="Zacatek platnosti" 
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

        <Button mt={15}>Add</Button>
      </Modal>
    </div>
  );
};

export default LinksPage;
