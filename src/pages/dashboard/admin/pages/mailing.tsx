import { Button, Checkbox, Paper, Select, Text } from "@mantine/core";

const MailingPage = () => {
  return (
    <Paper withBorder shadow="xs" p="md">
      <Checkbox label="Chcete zamestnancum zasilat pravidelne emaily?" size="lg" />

      <Select
        mt={13}
        label="Jak casto posilat maily?"
        data={[
          { value: "week", label: "Tydne" },
          { value: "month", label: "Mesicne" }
        ]}
      />

      <Button mt={15}>Upravit</Button>
    </Paper>
  );
};

export default MailingPage;
