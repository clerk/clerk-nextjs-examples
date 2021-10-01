import "../styles/globals.css";
import "../styles/App.css";
import type { AppProps } from "next/app";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { Home } from "../components/Home";
import { useRouter } from "next/router";
import SignUpPage from "./sign-up/[[...index]]";
import SignInPage from "./sign-in/[[...index]]";
import GithubLink from "../components/GithubLink";

function MyApp({ pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ClerkProvider>
      <main>
        <SignedIn>
          <Home {...pageProps} />
        </SignedIn>
        <SignedOut>
          {router.pathname.match("/sign-up") ? <SignUpPage /> : <SignInPage />}
        </SignedOut>
      </main>
      <footer>
        <GithubLink
          label="Transistor is a live demo that showcases Clerk components"
          repoLink="https://github.com/clerkinc/clerk-nextjs-examples/tree/main/examples/transistor"
        />
      </footer>
    </ClerkProvider>
  );
}
export default MyApp;
