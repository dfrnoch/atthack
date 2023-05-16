import { Button, Checkbox, Paper, Select, Text } from "@mantine/core";

const MailingPage = () => {
  return (
    <Paper withBorder shadow="xs" p="md">
      <Checkbox label="Chcete zaměstnancům zasílat pravidelné emaily?" size="lg" />

      <Select
        mt={13}
        label="Jak často posílat maily?"
        data={[
          { value: "week", label: "Týdně" },
          { value: "month", label: "Měsíčně" }
        ]}
      />

      <Button mt={15}>Upravit</Button>
    </Paper>
  );
};

export default MailingPage;
