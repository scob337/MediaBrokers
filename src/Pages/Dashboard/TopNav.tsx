import { Link, NavLink } from "react-router-dom";

const TopNav = () => {
  return (
    <div className=" bg-white shadow-md flex items-center sticky top-1 z-[20] h-[72px] py-2.5 w-full">
      <div className="container flex items-center justify-between w-full ">
        <div className="flex justify-center items-center gap-[15px] md:gap-[30px] w-[90%] m-auto">
        <div className="logo">

        </div>         
         <div className="flex gap-4 items-center text-[18px]">
            <NavLink className="NavLins" to="campaigns">
            campagne
            </NavLink>
            <NavLink className="NavLins" to="lists">
            Elenchi
            </NavLink>
            <NavLink className="NavLins" to="templates">
            Modelli
            </NavLink>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopNav;
