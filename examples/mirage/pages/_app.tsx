import "../client/styles/index.css";
import type { AppProps } from "next/app";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { Home } from "../client/components/Home";
import { useRouter } from "next/router";
import SignUpPage from "./sign-up/[[...index]]";
import SignInPage from "./sign-in/[[...index]]";
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
    </ClerkProvider>
  );
}
export default MyApp;
