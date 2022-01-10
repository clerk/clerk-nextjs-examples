import "../styles/globals.css";
import "../styles/App.css";
import type { AppProps } from "next/app";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/router";
import SignUpPage from "./sign-up/[[...index]]";
import SignInPage from "./sign-in/[[...index]]";
import GithubLink from "../components/GithubLink";

const theme = {
  general: {
    fontFamily: '"PT Sans"',
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ClerkProvider theme={theme} {...pageProps}>
      <main>
        <SignedIn>
          <Component {...pageProps} />
        </SignedIn>
        <SignedOut>
          {router.pathname.match("/sign-up") ? <SignUpPage /> : <SignInPage />}
        </SignedOut>
      </main>
      <footer>
        <GithubLink
          label="Acme is a live demo that showcases Clerk components"
          repoLink="https://github.com/clerkinc/clerk-nextjs-examples/tree/main/examples/acme"
        />
      </footer>
    </ClerkProvider>
  );
}
export default MyApp;
