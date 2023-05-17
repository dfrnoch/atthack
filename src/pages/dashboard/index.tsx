import { Container } from "@mantine/core";
import { Role } from "@prisma/client";

import dynamic from "next/dynamic";
import { api } from "~/utils/api";

// Lazy load the components
const UserDashboard = dynamic(() => import("~/components/dashboard/user"));
const AdminDashboard = dynamic(() => import("~/components/dashboard/admin"));

const Dashboard = () => {
  const userRole = api.user.getRole.useQuery();

  if (userRole.data) {
    if (userRole.data.role === Role.ADMIN) {
      return <UserDashboard />;
    } else if (userRole.data.role === Role.ADMIN) {
      return <AdminDashboard />;
    }
  }

  return <Container>Loading</Container>;
};

export default Dashboard;
