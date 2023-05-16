import { createStyles, Card, Image, Text, Group, Badge } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    ":hover": {
      cursor: "pointer",
      transform: "translate(0px, -2.5px)",
      transition: "ease-in-out",
      transitionDuration: "0.2s",
    },
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

export type Category = {
  image: string;
  title: string;
  description: string;
  status: "COMPLETED" | "IN_PROGRESS" | "UNCOMPLETED";
};

const CategoryItem = ({ image, title, description, status }: Category) => {
  const { classes } = useStyles();

  const statusBadge = () => {
    switch (status) {
      case "COMPLETED":
        return <Badge color="green">Dokončené</Badge>;

      case "IN_PROGRESS":
        return <Badge color="yellow">V procesu</Badge>;

      case "UNCOMPLETED":
        return <Badge color="red">Uzamčené</Badge>;
    }
  };

  return (
    <Card mb={8} mt={10} withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        <Image src={image} height={120} width={140} />
        <div className={classes.body}>
          {statusBadge()}

          <Text className={classes.title} size={"lg"} mt="xs">
            {title}
          </Text>

          <Text color="dimmed" size="sm">
            {description}
          </Text>
        </div>
      </Group>
    </Card>
  );
};

export default CategoryItem;
