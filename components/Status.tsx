import { CheckCheck } from "lucide-react";

export type StatusProps = {
  details: {
    status?: string;
    statusText?: string;
  };
};

export default function Status({
  details: { status, statusText },
}: StatusProps) {
  return (
    <main
      className={`${
        status === "success"
          ? "bg-green-500"
          : status === "fail"
          ? "bg-red-500"
          : ""
      } absolute top-10 right-10 text-white p-5 w-80 rounded-md flex justify-between items-center`}
    >
      <p>{statusText}</p>
      <CheckCheck />
    </main>
  );
}
