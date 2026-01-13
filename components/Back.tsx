import { useNavigate } from "react-router-dom";

export default function Back() {
  const route = useNavigate();
  return (
    <button onClick={() => route("/")} className="bg-gray-400 h-10 w-20">
      Back
    </button>
  );
}
