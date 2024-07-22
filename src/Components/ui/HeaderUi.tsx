interface IProps {
  header: string;
  headerApp: string;
  headerAppTwo: string;
}
const HeaderUi = ({ header, headerApp, headerAppTwo }: IProps) => {
  return (
    <div className="py-[16px]">
      <div>
        <h1 className="text-[24px] font-medium text-[#a6b5bd]">{header}</h1>
      </div>
      <div className="flex uppercase items-center gap-2 text-[14px]">
        <p className="text-gray-400">
          {headerApp} {">"}
        </p>{" "}
        <p>{headerAppTwo}</p>
      </div>
    </div>
  );
};

export default HeaderUi;
