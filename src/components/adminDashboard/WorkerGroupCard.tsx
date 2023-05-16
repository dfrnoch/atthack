import { createStyles, Card, Text, Group } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    width: 430,
    transition: "ease-in-out",
    transitionDuration: "0.15s",
    ':hover': {
      cursor: 'pointer',
      opacity: "80%"
    }
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md
  },

  placeholder: {
    height: "140px",
    width: "140px"
  }
}));

interface ArticleCardVerticalProps {
  color: string;
  category: string;
  title: string;
  workerCount: number;
  createdAt: Date;
}

const WorkerGroupCard = ({
  color,
  category,
  title,
  workerCount, 
  createdAt
}: ArticleCardVerticalProps) => {
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        <div 
            style={{ backgroundColor: color }} 
            className={classes.placeholder}
        />

        <div className={classes.body}>
          <Text transform="uppercase" color="dimmed" weight={700} size="xs">
            {category}
          </Text>

          <Text className={classes.title} mt="xs" mb="md">
            {title}
          </Text>

          <Group noWrap spacing="xs">
            <Group spacing="xs" noWrap>
              <Text size="xs">{workerCount} workers</Text>
            </Group>
            <Text size="xs" color="dimmed">
              •
            </Text>
            <Text size="xs" color="dimmed">
              {createdAt.toLocaleDateString()}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}

export default WorkerGroupCard;