"use client";

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

export default function MyNavbar({ children }: { children: any }) {
  function myMenuItems() {
    return menuItems.map((item) => (
      <li key={item.href}>
        <a href={item.href}>{item.text}</a>
      </li>
    ));
  }

  const navbar = (
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
        <a href="/" className="text-xl">
          <img src="/favicon.ico" className="h-6 sm:h-9" alt="site logo" />
        </a>
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
        {navbar}

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
