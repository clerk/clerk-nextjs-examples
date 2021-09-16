import "../client/styles/index.css";
import type { AppProps } from "next/app";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { Home } from "../client/components/Home";
import { GithubLink } from "../client/components/clerk/GithubLink";
import { useRouter } from "next/router";
import SignUpPage from "./sign-up/[[...index]]";
import { MainLayout } from "../client/components/layout/MainLayout";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ClerkProvider>
      <MainLayout>
        <SignedIn>
          <Home {...pageProps} />
        </SignedIn>
        <SignedOut>
          {router.pathname === "/" ? (
            <SignUpPage />
          ) : (
            <Component {...pageProps} />
          )}
        </SignedOut>
      </MainLayout>
      <footer>
        <GithubLink
          label="Mirage is a live demo that showcases Clerk components"
          repoLink="https://github.com/clerkinc/clerk-nextjs-examples/tree/main/examples/mirage"
        />
      </footer>
    </ClerkProvider>
  );
}
export default MyApp;
