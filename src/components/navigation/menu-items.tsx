import { Home, LandPlotIcon, Ticket, Tv } from "lucide-react";

export interface MenuItem {
  text: string;
  href: string;
  active?: boolean;
  icon?: any;
  mobileOnly?: boolean;
}

export const menuItems: MenuItem[] = [
  { text: "Home", href: "/", icon: <Home /> },
  { text: "Movies", href: "/movie/", icon: <Ticket /> },
  { text: "TV Shows", href: "/tv-shows", icon: <Tv /> },
  {
    text: "Putt Putt",
    href: "/putt-putt",
    icon: <LandPlotIcon />,
    mobileOnly: true,
  },
];
