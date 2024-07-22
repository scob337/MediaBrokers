import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: "w-full" | "w-fit";
}
const Button = ({ children, className, width = "w-full", ...rest }: IProps) => {
  return (
    <button
      type="submit"
      className={`${className} ${width} rounded-lg border-0`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
