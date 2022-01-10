import "../styles/index.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import {
  ClerkProvider,
  RedirectToSignUp,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { GithubLink } from "../components/GithubLink";
import { MainLayout } from "../components/layout/MainLayout";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const publicPages = ["/", "/sign-in/[[...index]]", "/sign-up/[[...index]]"];

  console.log({pathname})

  return (
    <ClerkProvider {...pageProps}>
      <MainLayout>
        <SignedIn>
          <Component {...pageProps} />
        </SignedIn>
        <SignedOut>
          {publicPages.includes(pathname) ? (
            <Component {...pageProps} />
          ) : (
            <RedirectToSignUp />
          )}
        </SignedOut>
      </MainLayout>
      <footer>
        <GithubLink
          label="Oasis is a live demo that showcases how to build a custom sign up experience with Clerk"
          repoLink="https://github.com/clerkinc/clerk-nextjs-examples/tree/main/examples/oasis"
        />
      </footer>
    </ClerkProvider>
  );
}
export default MyApp;
