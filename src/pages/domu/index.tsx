import { useRouter } from 'next/router';
import SideBar from '../../components/SideBar';
import { api } from '../../utils/api';
import { useEffect } from 'react';
import { Grid } from '@mantine/core';

const HomePage = () => {
  const router = useRouter();

  // @ts-ignore
  const { error, data } = api.exercise.loadData.useQuery();

  useEffect(() => {
    if (data && !data.completedRegistration) {
      router.push("/domu/vitejte");
    }
  }, [data, router]);

  return (
    <div>
      <SideBar/>

      <Grid>
        <Grid.Col span={4}> 
        sfdljk
        </Grid.Col>

        <Grid.Col span={8}>
          sfdjlkfdsjlk
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default HomePage;
