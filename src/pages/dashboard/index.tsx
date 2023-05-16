import { Container, TextInput } from "@mantine/core";

const Dashboard = () => {
  return (
    <Container>
      <h1>Zpravovat Organizace, Pripojit se do organizace</h1>

      <TextInput label="ID organizace" placeholder="ID organizace" />
    </Container>
  );
};

export default Dashboard;
