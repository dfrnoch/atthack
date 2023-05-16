import { Flex, Title, Button, Modal, TextInput, NumberInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const LinksPage = () => {
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
            maw={400} 
            mx="auto" 
        />

        <Button>Přidat</Button>
      </Modal>
    </div>
  );
};

export default LinksPage;
