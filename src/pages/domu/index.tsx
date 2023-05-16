import { useRouter } from "next/router";
import SideBar from "../../components/SideBar";
import { api } from "../../utils/api";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();
  const { data } = api.home.loadData.useQuery();

  useEffect(() => {
    if (data && !data.completedRegistration) {
      router.push("/domu/vitejte");
    }
  }, [data, router]);

  return (
    <div>
      <SideBar />
    </div>
  );
};

export default HomePage;
