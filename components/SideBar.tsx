import { useNavigate } from "react-router-dom";
import { sideBar, type SideBar } from "../constant/data";
import { useState } from "react";
import { LogOut, Maximize, Minimize } from "lucide-react";
export default function SideBar() {
  const route = useNavigate();
  const [acitveSideBar, setActiveSideBar] = useState(true);
  return (
    <main
      className={`${
        acitveSideBar ? "w-16" : "block w-60"
      } bg-[#0a2540] border flex flex-col justify-between h-full p-2 `}
    >
      <div>
        <div
          className={`${
            acitveSideBar ? "justify-center items-center" : "items-center gap-3"
          } flex `}
        >
          <div className="">
            <p
              className={`${
                acitveSideBar ? "hidden" : "block"
              } w-full h-16 flex items-center text-2xl font-extrabold text-white`}
            >
              Student Portal
            </p>
          </div>
          <div className="text-white">
            {acitveSideBar ? (
              <Maximize onClick={() => setActiveSideBar(!acitveSideBar)} />
            ) : (
              <Minimize onClick={() => setActiveSideBar(!acitveSideBar)} />
            )}
          </div>
        </div>

        {/* SIDElINKS */}

        <div className=" mt-10 grid gap-3 ">
          {sideBar.map((each, index) => {
            return (
              <div
                key={index}
                className={`cursor-pointer bg-white h-14  rounded-[10px] flex items-center pl-3 hover:text-[#0a2540] hover:bg-gray-200`}
                onClick={() => route(each.to)}
              >
                <p className={`${acitveSideBar ? "hidden" : "block"}`}>
                  {each.link}
                </p>
                <span className={`${acitveSideBar ? "block" : "hidden"}`}>
                  {each.icons}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`cursor-pointer bg-white h-14  rounded-[10px] flex items-center pl-3 hover:text-[#0a2540] hover:bg-gray-200`}
        onClick={() => route("/")}
      >
        <p className={`${acitveSideBar ? "hidden" : "block"}`}>Logout</p>
        <span className={`${acitveSideBar ? "block" : "hidden"}`}>
          <LogOut />
        </span>
      </div>
    </main>
  );
}
