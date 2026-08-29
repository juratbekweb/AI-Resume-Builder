export interface NavItem {
  title: string;
  href: string;
}

export const mainNavConfig: NavItem[] = [
  {
    title: "Asboblar (Tools)",
    href: "/tools",
  },
  {
    title: "Shablonlar",
    href: "/dashboard/templates",
  },
  {
    title: "Tariflar",
    href: "/pricing",
  },
  {
    title: "FAQ",
    href: "/#faq",
  },
];
