import "../styles/globals.css";
import "../styles/App.css";
import type { AppProps } from "next/app";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { Home } from "../client/components/Home";
import { useRouter } from "next/router";
import SignUpPage from "./sign-up/[[...index]]";
import SignInPage from "./sign-in/[[...index]]";

function MyApp({ pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ClerkProvider>
      <SignedIn>
        <Home {...pageProps} />
      </SignedIn>
      <SignedOut>
        {router.pathname.match("/sign-up") ? <SignUpPage /> : <SignInPage />}
      </SignedOut>
    </ClerkProvider>
  );
}
export default MyApp;
