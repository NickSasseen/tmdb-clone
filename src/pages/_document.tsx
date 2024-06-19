import Navbar from "@/components/navbar";
import { Html, Head, Main, NextScript } from "next/document";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Document() {
  return (
    <Html lang="en" data-theme="halloween">
      <Head></Head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Navbar>
          <Main />
        </Navbar>
        <NextScript />
      </body>
    </Html>
  );
}
