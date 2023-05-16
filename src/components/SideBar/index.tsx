import { createStyles, Navbar, TextInput, Text, Group, ActionIcon, Tooltip, rem, ScrollArea } from "@mantine/core";
import { FaPlus, FaSearch } from "react-icons/fa";
import SideBarCategory from './category';

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    },
  },

  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.sm,
    padding: `${rem(8)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: rem(20),
    height: rem(20),
    pointerEvents: "none",
  },

  collections: {
    paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
  },

  collectionLink: {
    display: "block",
    padding: `${rem(8)} ${theme.spacing.xs}`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

type Collection = {
  title: string;
  description: string;
  status: 'COMPLETED' | 'UNCOMPLETED' | 'IN_PROGRESS';
}

const collections: Collection[] = [
  {
    title: "Sales",
    description: "A brief short description describing this course in a short way",
    status: "COMPLETED"
  },
  {
    title: "Test kategorie bruh",
    description: "A brief short description describing this course in a short way",
    status: "IN_PROGRESS"
  },
  {
    title: "Nejaky hodne dlohy nazev",
    description: "A brief short description describing this course in a short way",
    status: "UNCOMPLETED"
  }
];

const NavbarSearch = () => {
  const { classes } = useStyles();

  const collectionLinks = collections.map((element) => (
    <SideBarCategory 
      image={"https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"} 
      title={element.title} 
      description={element.description}
      status={element.status}
    />
  ));

  return (
    <Navbar height={"100%"} width={{ sm: 400 }} p="md" className={classes.navbar}>
      <Navbar.Section className={classes.section}>
        <Group className={classes.collectionsHeader} position="apart">
          <Text size="lg" weight={500}>
            Collections
          </Text>
        </Group>
        
        <ScrollArea h={"85vh"}>
          <div className={classes.collections}>
            {collectionLinks}
          </div>
        </ScrollArea>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarSearch;
