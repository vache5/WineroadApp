export type NavItem = {
  key: "home" | "about" | "tours" | "gallery" | "contact";
  href: "/" | "/about" | "/tours" | "/gallery" | "/contact";
};

export const useNavItems = (): NavItem[] => [
  { key: "home", href: "/" },
  { key: "tours", href: "/tours" },
  { key: "gallery", href: "/gallery" },
  { key: "contact", href: "/contact" },
  { key: "about", href: "/about" },
];
