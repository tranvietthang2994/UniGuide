import { Menu } from "@/types/menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Tính năng",
    newTab: false,
    path: "#features",
  },
  // {
  //   id: 2,
  //   title: "Pricing",
  //   newTab: false,
  //   path: "#pricing",
  // },
  // {
  //   id: 2,
  //   title: "Blog",
  //   newTab: false,
  //   path: "#blog",
  // },
  // {
  //   id: 4,
  //   title: "Buy Now ↗",
  //   newTab: true,
  //   path: "https://fap.fpt.edu.vn/",
  // },
  {
    id: 2,
    title: "Trắc nghiệm",
    newTab: false,
    path: "/quiz",
  },
  {
    id: 3,
    title: "Tra cứu điểm",
    newTab: false,
    path: "/score-lookup",
  },
  {
    id: 4,
    title: "Review trường",
    newTab: false,
    path: "/university-review",
  },
];
