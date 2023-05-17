import { Button, Checkbox, Divider, Paper, Select, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { api } from "~/utils/api";

const MailingPage = () => {
  const internetData = api.company.getEmailFrequency.useQuery();
  const [data, setData] = useState(internetData.data?.phishingEmailFrequencyDays);
  const insane = api.mail.sendPhishingEmailToSelf.useMutation();
  const mutateData = api.company.setEmailFrequency.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Mailing",
        message: "Úspěšně jste upravili mailing",
      });
    },
  });

  return (
    <Paper withBorder shadow="xs" p="md">
      <Checkbox
        label="Chcete zaměstnancům zasílat pravidelné emaily?"
        size="lg"
        checked={data !== 0}
        onChange={(e) => {
          if (data === 0) {
            setData(7);
          } else {
            setData(0);
          }
        }}
      />

      <Select
        disabled={data === 0}
        mt={13}
        label="Jak často máme zasílat maily?"
        value={data?.toString()}
        onChange={(value) => {
          setData(parseInt(value || "0"));
        }}
        data={[
          { value: "7", label: "Týdně" },
          { value: "30", label: "Měsíčně" },
        ]}
      />

      <Button
        onClick={() => {
          mutateData.mutateAsync(data || 0);
        }}
        loading={mutateData.isLoading}
        mt={15}
      >
        Upravit
      </Button>

      <Divider mt={10} mb={10} />

      <Text>Testování phishing emailů</Text>
      <Button
        onClick={() => {
          insane.mutateAsync();
        }}
        loading={insane.isLoading}
      >
        Odeslat testovací email
      </Button>
    </Paper>
  );
};

export default MailingPage;
