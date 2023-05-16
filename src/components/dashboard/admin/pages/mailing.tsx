import { Button, Checkbox, Paper, Select, Text } from "@mantine/core";
import { useState } from "react";
import { api } from "~/utils/api";

const MailingPage = () => {
  const internetData = api.company.getEmailFrequency.useQuery();
  const mutateData = api.company.setEmailFrequency.useMutation();
  const [data, setData] = useState({
    phishingEmailFrequencyDays: 0,
    lastPhishingEmailSendTime: new Date(),
    ...internetData.data
  });

  return (
    <Paper withBorder shadow="xs" p="md">
      <Checkbox 
        label="Chcete zaměstnancům zasílat pravidelné emaily?" 
        size="lg"
        checked={data.phishingEmailFrequencyDays !== 0} 
        onChange={(e) => {
          if(data.phishingEmailFrequencyDays === 0) {
            setData({
              ...data,
              phishingEmailFrequencyDays: 7
            });
          } else {
            setData({
              ...data,
              phishingEmailFrequencyDays: 0
            });
          }
        }}
      />

      <Select
        disabled={data.phishingEmailFrequencyDays === 0}
        mt={13}
        label="Jak často posílat maily?"
        value={data.phishingEmailFrequencyDays.toString()}
        onChange={(value) => {
          setData({
            ...data,
            phishingEmailFrequencyDays: parseInt(value || "0")
          })
        }}
        data={[
          { value: "7", label: "Týdně" },
          { value: "30", label: "Měsíčně" }
        ]}
      />

      <Button 
        onClick={() => {
          mutateData.mutateAsync(data.phishingEmailFrequencyDays);
        }}
        loading={mutateData.isLoading}
        disabled={data.phishingEmailFrequencyDays === 0} 
        mt={15}
      >
        Upravit
      </Button>
    </Paper>
  );
};

export default MailingPage;
