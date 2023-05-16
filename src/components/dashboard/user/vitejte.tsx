import React, { useEffect, useState } from "react";
import { Container, Text, TextInput, Select, MultiSelect, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { api } from "../../../utils/api";
import { Gender } from "@prisma/client";
import Router from "next/router";

const WelcomePage = () => {
  const createUser = api.user.createUserDetails.useMutation();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [hobbies, setHobbies] = useState(["Sport", "Hudba", "Programování", "Čtení"]);
  const [education, setEducation] = useState("");

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (createUser.isSuccess) {
      Router.replace("/dashboard");
    }
  }, [createUser.isSuccess]);

  return (
    <Container size={isMobile ? "xs" : "sm"} className="mt-10">
      <Text align="center" size="xl" weight={500}>
        Pojddme si vytvorit ucet
      </Text>
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
    </Container>
  );
};

export default WelcomePage;
