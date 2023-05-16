import { Button, Container, TextInput } from "@mantine/core";
import Router from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const AdminPageWelcome = () => {
  const createCompany = api.admin.createCompany.useMutation();
  const [company, setCompany] = useState("");

  useEffect(() => {
    if (createCompany.isSuccess) {
      Router.replace("/dashboard/admin");
    }
  }, [createCompany.isSuccess]);

  return (
    <Container>
      <h1>Vítejte v administraci</h1>
      <p>V administraci můžete spravovat všechny části webu, jako jsou články, uživatelé, kategorie, atd.</p>

      <div className="mt-5 w-full">
        <TextInput
          label="Název firmy"
          placeholder="Super firma"
          onChange={(event) => setCompany(event.currentTarget.value)}
        />
        <Button
          type="submit"
          variant="light"
          className="mt-3"
          disabled={createCompany.isLoading}
          onClick={() => {
            createCompany.mutateAsync(company);
          }}
        >
          Vytvořit firmu
        </Button>
      </div>
    </Container>
  );
};

export default AdminPageWelcome;
