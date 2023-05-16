import { useEffect } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();
  const { data, error } = api.exercise.loadData.useQuery();

  useEffect(() => {
    if (error) {
      router.push("/domu/vitejte");
    }
  }, [error, router]);

  return (
    <div>
      <h1>Home Page</h1>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default HomePage;
