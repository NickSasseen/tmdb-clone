"use client";
import { RootLayout } from "@/components/layout";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-theme="halloween">
      <Head></Head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <RootLayout>
            <Main />
          </RootLayout>
          <NextScript />
        </ThemeProvider>
      </body>
    </Html>
  );
}
