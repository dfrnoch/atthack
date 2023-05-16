import { type AppType } from "next/app";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import { api } from "../utils/api";

import "../styles/globals.css";
import {createEmotionCache, MantineProvider, Navbar} from "@mantine/core";

// Do this to prevent mantine clashing with tailwind.
const myCache = createEmotionCache({ key: 'mantine', prepend: false });

const MyApp: AppType = ({ Component, pageProps }) => {

  return (
    <ClerkProvider {...pageProps}>
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            emotionCache={myCache}
            theme={{
                colorScheme: 'dark',
                // TODO: Change colors.
            }}
        >
            <Component {...pageProps} />
        </MantineProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
