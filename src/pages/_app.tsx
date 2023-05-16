import { type AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import { type Session } from "next-auth";

import "../styles/globals.css";
import { createEmotionCache, MantineProvider, Navbar } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

// Do this to prevent mantine clashing with tailwind.
const myCache = createEmotionCache({ key: "mantine", prepend: false });

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionCache={myCache}
        theme={{
          colorScheme: "dark",
          // TODO: Change colors.
        }}
      >
        <Notifications/>
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
