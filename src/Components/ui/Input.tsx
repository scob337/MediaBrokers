import { InputHTMLAttributes } from "react";

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ ...rest }: IProps) => {
  return (
    <input className=" ps-10 py-[12px]" {...rest} />
  );
};

export default Input;
