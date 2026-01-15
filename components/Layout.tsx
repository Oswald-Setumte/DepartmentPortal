import SideBar from "./SideBar";
import NavBar from "./NavBar";

type SubmitProps = {
  children: React.ReactNode;
};

export const fontcolor = {
  primary: "#042540",
  secondary: "#1e293b",
  text: "#334155",
};

export default function Layout({ children }: SubmitProps) {
  return (
    <main className="h-screen flex bg-[#f8fafc]">
      {/* SIDEBAR */}
      <section className="">
        <SideBar />
      </section>

      <section className=" flex-1">
        {/* NAVBAR */}
        <nav className="border h-20 p-2">
          <NavBar />
        </nav>

        {/* BODY */}
        <div className="border pl-3 pt-5 pr-5 h-[92.8vh]">{children}</div>
      </section>
    </main>
  );
}
