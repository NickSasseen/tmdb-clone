import Link from "next/link";
import { HiSearch } from "react-icons/hi";
import { HiHomeModern, HiTicket, HiTv } from "react-icons/hi2";

interface MenuItem {
  text: string;
  href: string;
  active?: boolean;
  icon?: any;
}

const menuItems: MenuItem[] = [
  { text: "Home", href: "/", icon: <HiHomeModern /> },
  { text: "Movies", href: "/movie/search", icon: <HiTicket /> },
  { text: "TV Shows", href: "/tv-shows", icon: <HiTv /> },
];

export default function MyNavbar({ children }: { children: any }) {
  function myMenuItems() {
    return menuItems.map((item) => (
      <li key={item.href}>
        <Link href={item.href} className="flex items-center space-x-2">
          <span>{item.icon !== undefined && item.icon}</span>
          <span>{item.text}</span>
        </Link>
      </li>
    ));
  }

  const bigNavbar = (
    <div className="navbar h-20 bg-gray-900 px-8">
      <div className="navbar-start space-x-10">
        {/* Icon */}
        <Link href="/" className="text-xl">
          <img src="/favicon.ico" className="h-6 sm:h-9" alt="site logo" />
        </Link>
        {/* Menu items */}
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center space-x-2 hover:text-primary btn btn-ghost"
          >
            <span>{item.icon !== undefined && item.icon}</span>
            <span>{item.text}</span>
          </Link>
        ))}
      </div>

      <div className="navbar-end">
        <Link className="btn btn-ghost text-2xl" href="/search">
          <HiSearch />
        </Link>
      </div>
    </div>
  );

  const smallNavbar = (
    <div className="navbar bg-gray-900">
      <div className="navbar-start">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
        </div>
      </div>

      <div className="navbar-center">
        <Link href="/" className="text-xl">
          <img src="/favicon.ico" className="h-6 sm:h-9" alt="site logo" />
        </Link>
      </div>

      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="md:hidden">{smallNavbar}</div>
        <div className="hidden md:block">{bigNavbar}</div>

        {/* Page content here */}
        {children}
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-3/5 min-h-full bg-gray-900">
          {/* Sidebar content here */}
          {myMenuItems()}
        </ul>
      </div>
    </div>
  );
}
