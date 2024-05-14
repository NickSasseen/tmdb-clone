import Navbar from "@/components/navbar";
import { ThemeModeScript } from "flowbite-react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-theme="halloween">
      <Head>
        <ThemeModeScript />
      </Head>
      <body>
        <Navbar>
          <Main />
        </Navbar>
        <NextScript />
      </body>
    </Html>
  );
}
