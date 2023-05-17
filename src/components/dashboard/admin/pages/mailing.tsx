import { Button, Checkbox, Paper, Select, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { api } from "~/utils/api";

const MailingPage = () => {
  const internetData = api.company.getEmailFrequency.useQuery();
  const [data, setData] = useState(internetData.data?.phishingEmailFrequencyDays);
  const mutateData = api.company.setEmailFrequency.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Mailing",
        message: "Uspesne jste upravili mailing"
      });
    }
  });

  return (
    <Paper withBorder shadow="xs" p="md">
      <Checkbox 
        label="Chcete zaměstnancům zasílat pravidelné emaily?" 
        size="lg"
        checked={data !== 0} 
        onChange={(e) => {
          if(data === 0) {
            setData(7);
          } else {
            setData(0);
          }
        }}
      />

      <Select
        disabled={data === 0}
        mt={13}
        label="Jak často posílat maily?"
        value={data?.toString()}
        onChange={(value) => {
          setData(parseInt(value || "0"));
        }}
        data={[
          { value: "7", label: "Týdně" },
          { value: "30", label: "Měsíčně" }
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
    </Paper>
  );
};

export default MailingPage;
