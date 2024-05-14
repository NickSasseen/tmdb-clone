"use client";
import { Navbar } from "flowbite-react";
import Link from "next/link";

interface MenuItem {
  text: string;
  href: string;
  active?: boolean;
  icon?: any;
}

const menuItems: MenuItem[] = [
  { text: "Home", href: "/" },
  { text: "Movies", href: "/movies" },
  { text: "TV Shows", href: "/tv-shows" },
];

export default function MyNavbar() {
  return (
    <Navbar fluid rounded className="bg-gray-900">
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          src="/favicon.ico"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          TMDB Clone
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );

  return (
    <Navbar fluid rounded className="border-gray-200 bg-gray-900">
      <Navbar.Brand href="/" className="space-x-3 items-center">
        <img src="/favicon.ico" className="h-8" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          TMDB Clone
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link href="/">Test</Navbar.Link>
        {/* {menuItems.map((menuItem, index) => (
          <Navbar.Link key={index} href={menuItem.href}>
            {menuItem.text}
          </Navbar.Link>
        ))} */}
      </Navbar.Collapse>
    </Navbar>
  );
}
