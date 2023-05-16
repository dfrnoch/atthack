import { Button, Container, TextInput } from "@mantine/core";

const AdminPageWelcome = () => {

    


  return (
    <Container>
      <h1>Vítejte v administraci</h1>
      <p>V administraci můžete spravovat všechny části webu, jako jsou články, uživatelé, kategorie, atd.</p>

      <div className="mt-5 w-full">
        <TextInput label="Název firmy" placeholder="Super firma" />
        <Button type="submit" variant="light" className="mt-3">
          Vytvořit firmu
        </Button>
      </div>
    </Container>
  );
};

export default AdminPageWelcome;
