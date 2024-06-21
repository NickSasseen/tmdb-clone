import { Home, Ticket, Tv } from "lucide-react";

export interface MenuItem {
  text: string;
  href: string;
  active?: boolean;
  icon?: any;
}

export const menuItems: MenuItem[] = [
  { text: "Home", href: "/", icon: <Home /> },
  { text: "Movies", href: "/movie/", icon: <Ticket /> },
  { text: "TV Shows", href: "/tv-shows", icon: <Tv /> },
];
