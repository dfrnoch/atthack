import { useRouter } from 'next/router';
import SideBar from '../../components/SideBar';
import { api } from '../../utils/api';
import { useEffect } from 'react';

const HomePage = () => {
  const router = useRouter();
  const { error } = api.exercise.loadData.useQuery();

  useEffect(() => {
    if (error) {
      router.push("/domu/vitejte");
    }
  }, [error, router]);

  return (
    <div>
      <SideBar/>
    </div>
  );
};

export default HomePage;
