import { v4 as uuid } from "uuid";
import { IFormInput, Cards } from "../interfaces";
import IconMail from "../Components/Icon/IconMail";
import IconLockDots from "../Components/Icon/IconLockDots";
import IconUser from "../Components/Icon/IconUser";
import IconPhoneCall from "../Components/Icon/IconPhoneCall";


export const signIn: IFormInput[] = [
  {
    id: uuid(),
    type: "email",
    name: "email",
    label: "Email",
    icon: IconMail,
  },
  {
    id: uuid(),
    type: "password",
    name: "password",
    label: "Password",
    icon: IconLockDots,
  },
];
export const addUsers: IFormInput[] = [
  {
    id: uuid(),
    type: "text",
    name: "firstName",
    label: "First Name",
    icon: IconUser,
  },
  {
    id: uuid(),
    type: "email",
    name: "lastName",
    label: "Last Name",
    icon: IconUser,
  },
  {
    id: uuid(),
    type: "tel",
    name: "mobile",
    label: "Mobile",
    icon: IconPhoneCall,
  },
  {
    id: uuid(),
    type: "email",
    name: "email",
    label: "Email",
    icon: IconMail,
  },
  {
    id: uuid(),
    type: "password",
    name: "password",
    label: "Password",
    icon: IconLockDots,
  },
  {
    id: uuid(),
    type: "radio",
    name: "role",
    label: "Role",
    options: ["admin", "user", "writer"],
  },
];
export const editUsers: IFormInput[] = [
  {
    id: uuid(),
    type: "text",
    name: "firstName",
    label: "First Name",
    icon: IconUser,
  },
  {
    id: uuid(),
    type: "email",
    name: "lastName",
    label: "Last Name",
    icon: IconUser,
  },
  {
    id: uuid(),
    type: "tel",
    name: "mobile",
    label: "Mobile",
    icon: IconPhoneCall,
  },
  {
    id: uuid(),
    type: "email",
    name: "email",
    label: "Email",
    icon: IconMail,
  },
  {
    id: uuid(),
    type: "password",
    name: "password",
    label: "Password",
    icon: IconLockDots,
  },
  {
    id: uuid(),
    type: "radio",
    name: "role",
    label: "Role",
    options: ["admin", "user", "writer"],
  },
];

export const restPassword: IFormInput[] = [
  {
    id: uuid(),
    type: "password",
    name: "oldPassword",
    label: "Old Password",
    icon: IconLockDots,
  },
  {
    id: uuid(),
    type: "password",
    name: "newPassword",
    label: "New Password",
    icon: IconLockDots,
  },
];
export const cardItem: Cards[] = [
  {
    id: uuid(),
    name: "Consegnate ",
    number: "19,122",
  },
  {
    id: uuid(),
    name: "Aperte",
    number: "10.22%",
  },
  {
    id: uuid(),
    name: "Click",
    number: "1.22%",
  },
  {
    id: uuid(),
    name: "Bounce",
    number: "2.8%",
  },
  
];
