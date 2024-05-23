import Navbar from "@/components/navbar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-theme="halloween">
      <Head></Head>
      <body>
        <Navbar>
          <Main />
        </Navbar>
        <NextScript />
      </body>
    </Html>
  );
}
