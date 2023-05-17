import React, { useEffect, useState } from "react";
import { Container, Text, TextInput, Select, MultiSelect, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { api } from "../utils/api";
import { Company, CompanyWorkerGroup, Gender, Invite } from "@prisma/client";
import Router from "next/router";

const UserWelcomeModal = ({
  invite,
}: {
  invite: Invite & {
    Company: Company & {
      CompanyWorkers: CompanyWorkerGroup[];
    };
  };
}) => {
  const createUser = api.user.createUserDetails.useMutation();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [hobbies, setHobbies] = useState(["Sport", "Hudba", "Programování", "Čtení"]);
  const [education, setEducation] = useState("");

  const [workergroup, setWorkergroup] = useState(invite.Company.CompanyWorkers[0]);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (createUser.isSuccess) {
      Router.replace("/dashboard");
    }
  }, [createUser.isSuccess]);

  return (
    <>
      <TextInput
        label="Věk"
        value={age}
        onChange={(event) => setAge(event.currentTarget.value)}
        type="number"
        min="1"
        max="120"
        required
      />
      <Select
        label="Pohlaví"
        value={gender}
        onChange={(value) => setGender(value as Gender)}
        data={[
          { value: Gender.MALE, label: "Muž" },
          { value: Gender.FEMALE, label: "Žena" },
        ]}
        required
      />
      <Select
        label="Pracovní skupina"
        value={workergroup?.id}
        onChange={(value) => setWorkergroup(invite.Company.CompanyWorkers?.find((worker) => worker.id === value))}
        data={invite.Company.CompanyWorkers.map((worker) => ({
          value: worker.id,
          label: worker.name,
        }))}
        required
      />

      <MultiSelect
        label="Koníčky"
        data={hobbies}
        placeholder="Přidejte své koníčky"
        searchable
        creatable
        getCreateLabel={(query) => `+ Přidat ${query}`}
        onCreate={(query) => {
          const item = { value: query, label: query };
          setHobbies((current) => [...current, item.value]);
          return item;
        }}
      />
      <TextInput label="Vzdělání" value={education} onChange={(event) => setEducation(event.currentTarget.value)} />
      <Button
        className="mt-10"
        type="submit"
        variant="light"
        onClick={() => {
          createUser.mutateAsync({
            inviteId: invite.id,
            workerGroupId: workergroup?.id || "",
            age: parseInt(age),
            gender,
            hobbies,
            education,
          });
        }}
        disabled={createUser.isLoading}
      >
        Pokračovat
      </Button>
    </>
  );
};

export default UserWelcomeModal;
