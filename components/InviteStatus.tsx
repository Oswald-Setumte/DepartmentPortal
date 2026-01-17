import { Outlet } from "react-router-dom";
import api from "../utils/api";
import Status, { type StatusProps } from "./Status";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type submit = {
  _id: string;
  email: string;
  teadId: {
    name: string;
    leader: string;
  };
  status: string;
};

export default function InviteStatus() {
  const [closeInvite, setCloseInvite] = useState(false);
  const [pendingInvites, setPendingInvite] = useState<submit[]>([]);
  const [status, setStatus] = useState<StatusProps["details"]>({
    status: "",
    statusText: "",
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadPendingInvite = () => {
      api
        .get("/teams/invites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setStatus({
            status: response.data.status.toString(),
            statusText: response.data.status,
          });
          setPendingInvite(response.data.data);
        })
        .catch((err) => console.log(err));
    };
    loadPendingInvite();
  }, []);

  const onDelete = (id: string) => {
    try {
      api
        .delete(`/team/members/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setStatus({
            status: response.data.status,
            statusText: response.data.status,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {}
  };
  const onResponse = (id: string) => {
    try {
      api
        .post(`/team/invites/${id}/respond`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setStatus({
            status: "success",
            statusText: response.data.action,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {}
  };

  return (
    <section
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
          <thead>
            <tr className="h-12">
              <th className="border border-gray-300">TEAM</th>
              <th className="border border-gray-300">EMAIL</th>
              <th className="border border-gray-300">RESPOND ID</th>
              <th className="border border-gray-300">STATUS</th>
              <th className="border border-gray-300">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {pendingInvites.map((each, index) => {
              return (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300">{each.teadId.name}</td>
                  <td className="border border-gray-300">{each.email}</td>
                  <td className="border border-gray-300">{each._id}</td>
                  <td className="border border-gray-300">{each.status}</td>
                  <td className="flex justify-evenly p-1 border border-gray-300">
                    <button
                      onClick={() => {
                        console.log(each._id);
                        onResponse(each._id);
                      }}
                      className="bg-green-700 cursor-pointer text-white h-10 w-20"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => {
                        console.log("delete id ", each._id);
                        onDelete(each._id);
                      }}
                      className="bg-red-600  cursor-pointer text-white h-10 w-20"
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </article>
    </section>
  );
}
