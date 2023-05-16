import { Container, TextInput } from "@mantine/core";

// import dynamic from "next/dynamic";

// // Lazy load the components
// const UserDashboard = dynamic(() => import("../components/UserDashboard"));
// const AdminDashboard = dynamic(() => import("../components/AdminDashboard"));

const Dashboard = () => {
  return (
    <Container>
      <h1>Zpravovat Organizace, Pripojit se do organizace</h1>

      <TextInput label="ID organizace" placeholder="ID organizace" />
    </Container>
  );
};

export default Dashboard;
