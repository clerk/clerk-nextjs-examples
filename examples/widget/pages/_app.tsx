import "../styles/globals.css";
import "../styles/variables.css";
import type {AppProps} from "next/app";
import {ClerkProvider, RedirectToSignUp, SignedIn, SignedOut,} from "@clerk/nextjs";
import GithubLink from "../components/GithubLink";
import {useRouter} from "next/router";
import {Dashboard} from "../components/Dashboard";

function WidgetApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]"];

  return (
    <>
      <ClerkProvider {...pageProps}>
        <SignedIn>
          <Dashboard />
        </SignedIn>
        <SignedOut>
          {publicPages.includes(pathname) ? (
            <Component {...pageProps} />
          ) : (
            <RedirectToSignUp />
          )}
        </SignedOut>
      </ClerkProvider>
      <footer>
        <GithubLink
          label="Widget is a live demo that showcases how to add custom fields on the user"
          repoLink="https://github.com/clerkinc/clerk-nextjs-examples/tree/main/examples/widget"
        />
      </footer>
    </>
  );
}
export default WidgetApp;
