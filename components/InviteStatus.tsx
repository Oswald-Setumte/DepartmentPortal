import api from "../utils/api";
import Status, { type StatusProps } from "./Status";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type submit = {
  id: string;
  email: string;
  teadId: {
    name: string;
    leader: string;
  };
  status: string;
};

export default function InviteStatus() {
  const [closeInvite, setCloseInvite] = useState(false);
  const [pendingInvites, setPendingInvite] = useState<Array<submit>>([
    {
      id: "",
      email: "",
      teadId: {
        name: "",
        leader: "",
      },
      status: "",
    },
  ]);
  const [status, setStatus] = useState<StatusProps["details"]>({
    status: "",
    statusText: "",
  });

  useEffect(() => {
    const loadPendingInvite = () => {
      api
        .get("/teams/invites")
        .then((response) => {
          setStatus({
            status: response.status.toString(),
            statusText: response.data.message,
          });
          setPendingInvite(response.data);
        })
        .catch((err) => console.log(err));
    };
    loadPendingInvite();
  });

  return (
    <form
      className={`${
        closeInvite && "hidden"
      } grid shadow-md border  border-gray-400 p-5`}
    >
      <Status details={status} />

      <article className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">View My Pending Invites</h1>
        <X
          size={20}
          onClick={() => {
            setCloseInvite(true);
          }}
          className="cursor-pointer"
        />
      </article>

      <hr className="text-gray-400 mt-5 mb-5" />

      <article>
        <table className="w-full">
          <tr className="h-12">
            <th className="border border-gray-300">LEADER</th>
            <th className="border border-gray-300">EMAIL</th>
            <th className="border border-gray-300">STATUS</th>
          </tr>
          {pendingInvites.map((each, index) => {
            return (
              <tr key={index} className="h-10  text-center">
                <td className="border border-gray-300 capitalize">
                  {each.teadId.leader} oswald
                </td>
                <td className="border lowercase border-gray-300">
                  {each.email} sensation@gmail.com
                </td>
                <td className="border capitalize border-gray-300 ">
                  {each.status} pending
                </td>
              </tr>
            );
          })}
        </table>
        <button
          type="submit"
          className="bg-[#0a2540] float-right mt-5 cursor-pointer text-white h-10 w-20"
        >
          Reload
        </button>
      </article>
    </form>
  );
}
