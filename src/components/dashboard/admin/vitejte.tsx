import { Button, Card, Container, TextInput } from "@mantine/core";
import Router from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const AdminPageWelcome = ({ onSuccess }: { onSuccess: () => void }) => {
  const createCompany = api.admin.createCompany.useMutation({
    onSuccess: () => {
      onSuccess();
    },
  });
  const [company, setCompany] = useState("");

  return (
    <div className="w-screen h-screen backdrop-blur bg-gray-800/75 absolute z-50 flex justify-center items-center">
      <Card>
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
      </Card>
    </div>
  );
};

export default AdminPageWelcome;
