import { createStyles, Card, Image, Text, Group, Badge } from "@mantine/core";
import { Category } from "@prisma/client";

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
}));

const CategoryItem = ({ image, name, description, onClick }: Category & { onClick: () => void }) => {
  const { classes } = useStyles();

  return (
    <Card mb={8} mt={10} withBorder radius="md" p={0} className={classes.card} onClick={onClick}>
      <Group noWrap spacing={0} p={0}>
        <Image src={image} height={120} width={140} />
        <div className="pl-4">
          <Text className={classes.title} size={"lg"} mb="xs">
            {name}
          </Text>

          {/* limit to 2 linex */}
          <Text color="dimmed" size="sm" className="line-clamp-2">
            {description}
          </Text>
        </div>
      </Group>
    </Card>
  );
};

export default CategoryItem;
