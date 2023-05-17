import { Avatar, Group, Paper, createStyles, Text, Title } from "@mantine/core";
import { Exercise, User } from "@prisma/client";
import { api } from "~/utils/api";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },

  place: {
    fontWeight: 900,
    fontSize: "23px",
  },
}));

const LeaderboardPlaceItem = ({ user, place }: { user: User & { completedExercises: Exercise[] }; place: number }) => {
  const { classes } = useStyles();

  return (
    <Paper className={classes.user}>
      <Group>
        <Text className={classes.place}>{place}</Text>

        <Avatar src={user.image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="lg" weight={500}>
            {user.name}
          </Text>

          <Text color="dimmed" size="xs">
            {user.email}
          </Text>
        </div>

        <Text>{(user.completedExercises.length * 10).toString()} XP</Text>
      </Group>
    </Paper>
  );
};

export const Leaderboard = () => {
  const data = api.company.getLeaderboard.useQuery();

  return (
    <div>
      <Title size={20} mt={15}>
        Žebříček kolegů
      </Title>

      {data.data?.map((el, index) => {
        return <LeaderboardPlaceItem user={el} place={index + 1} key={el.id} />;
      })}
    </div>
  );
};
