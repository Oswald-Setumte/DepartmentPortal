import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <main className="flex justify-center items-center h-screen">
      <section className="flex flex-col gap-10 items-center">
        <p className="text-4xl font-bold">
          The University of Energy and Natural Resources
        </p>

        <button
          onClick={() => navigate("/signUp")}
          className="bg-[#0a2540] text-white h-10 w-22 font-semibold"
        >
          Sign Up
        </button>
      </section>
    </main>
  );
}

export default App;
