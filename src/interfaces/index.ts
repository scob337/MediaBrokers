import { FC } from "react";
import { TypeName } from "../types";
import { IconMailProps } from "../Components/Icon/IconMail";
import { IconLockDotsProps } from "../Components/Icon/IconLockDots";
import { IconUserProps } from "../Components/Icon/IconUser";

export interface IForm {
  email: string;
  password?: string;
  oldPassword?: string;
  newPassword?: string;
  lastName?: string;
  firstName?: string;
  mobile?: string;
  role?: string;
}
export interface IFormInput {
  id?: string | undefined;
  name: TypeName;
  type: string;
  label: string;
  options?: string[];
  icon?: FC<IconMailProps> | FC<IconLockDotsProps> | FC<IconUserProps>;
}
export interface Cards {
  id?: string | undefined;
  name: string;
  number: string;
}
export interface ITables {
  id?: string | undefined;
  name: string;
  class?:string;
}
export interface ILinksDrop {
  id?: string | undefined;
  nameDrop: string;
  linkDrop: string;
}

export interface SideNavProps {
  handleToggleSidebar: () => void;
}
