import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";

function Dashboard() {
  return (
    <div className="relative bg-gray-100 overflow-hidden">
      <div
        className={`flex flex-col ml-[0px] min-h-screen transition-all duration-[0.5s]`}
      >
        <TopNav />
        <div className="container py-[26px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
