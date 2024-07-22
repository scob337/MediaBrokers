import { ReactNode } from "react";
import { ITables } from "../../interfaces";
interface IProps {
  Header: ITables[];
  children: ReactNode;
}
const Table = ({ Header, children}: IProps) => {
  //  -------- Render ----------
  const headerRender = Header.map((i,index) => {
    return (

        <th
          scope="col"
          className={`font-semibold min-w-[180px] max-w-[200px] bg-white px-3 py-3 text-[16px] text-center ${i.class}`}
          key={index}
        >
          {i.name}
        </th>
    );
  });

  return (
    <div className="relative mt-[8px] overflow-x-auto mb-[28px] sm:rounded-lg">
      <table className="w-full text-sm text-left">
        <thead className="text-black text-md uppercase bg-gray-50 border-b-[2px] border-gray-300 ">
          <tr>
            {headerRender}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
