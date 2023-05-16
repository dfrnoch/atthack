import Head from "next/head";
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
  Accordion,
} from "@mantine/core";
import { FaCheck, FaLock } from "react-icons/fa";
import Router from "next/router";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },

  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    minHeight: 650,
  },

  faqTitle: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    border: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },
}));

const Homepage = () => {
  const { classes } = useStyles();

  return (
      <>
        <Head>
          <title>Internetová bezpečnost pro firmy</title>
          <meta name="description" content="Předejděte ztrátě nebo úniku dat z vaší firmy. Naše kurzy jsou personalizované inviduálně pro každého zaměstnance." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <Container>
            <div className={classes.inner}>
              <div className={classes.content}>
                <Title className={classes.title}>
                  <span className={classes.highlight}>Kyber Bezpečnost</span> pro firmy
                </Title>
                <Text color="dimmed" mt="md">
                  Naše mise spočívá v rozvýjení znalostí hrozeb na internetu, pro bezpečí vaší firmy i zaměstnanců.
                </Text>

                <List
                    mt={30}
                    spacing="sm"
                    size="sm"
                    icon={
                      <ThemeIcon size={20} radius="xl">
                        <FaCheck size={rem(12)} />
                      </ThemeIcon>
                    }
                >
                  <List.Item>
                    <b>Bezpečnost pro všechny</b>: Věříme, že kyber bezpečnost je dnes důležité téma. Naše kurzy jsou navrženy tak, aby byly persoalizované přímo pro vás, bez ohledu na věk nebo technickou zručnost.
                  </List.Item>
                  <List.Item>
                    <b>Praktické dovednosti</b>: Naše kurzy se zaměřují na praktické dovednosti, které vaši zaměstnanci mohou okamžitě začít využívat. Učíme, jak rozpoznat a předcházet hrozbám, které by mohly ohrozit vaše citlivá data a zařízení.
                  </List.Item>
                  <List.Item>
                    <b>Průběžný rozvoj</b>: V digitálním světě, kde se technologie a hrozby neustále vyvíjejí, se zavazujeme průběžně aktualizovat a rozšiřovat naše kurzy, abychom zůstali v čele v oblasti kyber bezpečnosti.
                  </List.Item>
                </List>

                <Group mt={30}>
                  <Button
                      radius="xl"
                      size="md"
                      onClick={() => Router.push("/prihlaseni")}
                      leftIcon={<FaLock />}
                      className={classes.control}
                  >
                    Přihlásit se
                  </Button>
                </Group>
              </div>
              <Image src="assets/image.svg"/>
            </div>
          </Container>

          <Container size="sm" className={classes.wrapper}>
            <Title align="center" className={classes.faqTitle}>
              Nejčastější otázky
            </Title>

            <Accordion variant="separated">
              <Accordion.Item className={classes.item} value="reset-password">
                <Accordion.Control>Co je to kyber bezpečnost?</Accordion.Control>
                <Accordion.Panel>
                  Kyber bezpečnost se týká nepsaných pravidel a postupů, které pomáhají chránit naše osobní informace a zařízení při používání internetu. Zahrnuje ochranu před viry, hackery, podvodnými praktikami a dalšími hrozbami.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>Proč je důležité se učit o kyber bezpečnosti?</Accordion.Control>
                <Accordion.Panel>
                  S rostoucí závislostí na internetu je důležitější než kdy dříve chránit sebe a své informace online. Učení o kyber bezpečnosti vám může pomoci předcházet útokům, krádeži identity a dalším potenciálním hrozbám.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>Jaké kurzy nabízíte pro výuku kyber bezpečnosti?</Accordion.Control>
                <Accordion.Panel>
                  Nabízíme řadu kurzů zaměřených na různé aspekty kyber bezpečnosti, včetně základů kyber bezpečnosti, ochrany osobních dat, bezpečného používání sociálních médií a dalších.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>Jsou vaše kurzy vhodné pro všechny věkové skupiny?</Accordion.Control>
                <Accordion.Panel>
                  Ano, naše kurzy jsou navrženy tak, aby byly přístupné a srozumitelné pro všechny věkové skupiny. Máme kurzy speciálně určené pro děti, mládež, dospělé i seniory.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="payment">
                <Accordion.Control>Co když během kurzu mám problémy nebo otázky?</Accordion.Control>
                <Accordion.Panel>
                  Pokud během kurzu máte jakékoliv otázky nebo problémy, neváhejte nás kontaktovat prostřednictvím naší podpůrné stránky. Naši odborníci jsou připraveni vám pomoci.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Container>
        </div>
      </>
  );
};


export default Homepage;
