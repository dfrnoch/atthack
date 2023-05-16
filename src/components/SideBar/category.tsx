import { createStyles, Card, Image, Avatar, Text, Group, Badge } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

interface CategoryProps {
  image: string;
  category: string;
  title: string;
  date: Date;
  author: string;
}

const Category = ({
  image,
  category,
  title,
  date,
  author,
}: CategoryProps) => {
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        <Image src={image} height={140} width={140} />
        <div className={classes.body}>
          <Badge color="dimmed" size="md">
            {category}
          </Badge>

          <Text className={classes.title} size={"lg"} mt="xs" mb="md">
            {title}
          </Text>

          <Group noWrap spacing="xs">
            <Group spacing="xs" noWrap>
              <Avatar size={20} src={image} />
              <Text size="xs">Jmeno nejaky</Text>
            </Group>
            <Text size="xs" color="dimmed">
              •
            </Text>
            <Text size="xs" color="dimmed">
              {date.toLocaleDateString()}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}

export default Category;