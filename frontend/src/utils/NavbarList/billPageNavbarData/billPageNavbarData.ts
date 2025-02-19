import { NavbarCategory } from "src/types/navbar/NavbarCategory";

export const billPageNavbarData: NavbarCategory[] = [
  {
    buttons: [
      {
        text: "Bills",
        to: "/",
        index: 0,
      },
    ],
  },
  {
    buttons: [
      {
        text: "Preview",
        to: `/bill/:billID`,
        index: 1,
      },
      {
        text: "Users",
        to: `/bill/:billID/users`,
        index: 2,
      },
      {
        text: "Setting",
        to: `/bill/:billID/setting`,
        index: 3,
      },
    ],
  },
];
