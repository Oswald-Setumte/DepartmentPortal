import { useEffect, useState } from "react";
import api from "./../utils/api";
import type { StatusProps } from "../components/Status";
import Status from "../components/Status";
import { X } from "lucide-react";

type member = {
  _id: string;
  email: string;
  indexNumber: string;
  role: string;
};
type getType = {
  name: string;
  members: member[];
};

export default function () {
  const [colseModal, setcloseModal] = useState(false);

  const [getmembers, setMember] = useState<getType>({
    name: "",
    members: [],
  });
  const [Notice, setNotice] = useState<StatusProps["details"]>({
    status: "",
    statusText: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const onsubmit = () => {
      try {
        api
          .get("/teams", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setMember({
              name: response.data.data.name,
              members: response.data.data.members,
            });

            setNotice({
              status: response.status.toString(),
              statusText: "Team fetched",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {}
    };
    onsubmit();
  }, []);

  return (
    <main
      className={`${
        colseModal ? "hidden" : "block"
      } grid shadow-md border  border-gray-400 p-5`}
    >
      <Status details={Notice} />
      <main>
        <section>
          <article className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{getmembers.name}</h1>

            <X
              size={20}
              onClick={() => {
                setcloseModal(true);
              }}
              className="cursor-pointer"
            />
          </article>
          <hr className="text-gray-400 mt-5" />

          <table className="w-full mt-5">
            <tr className="">
              <th className="border border-gray-300">Email</th>
              <th className="border border-gray-300">Index Nmber</th>
              <th className="border border-gray-300">User ID</th>
              <th className="border border-gray-300">ROLE</th>
            </tr>
            {getmembers.members.map((each, index) => {
              return (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300">{each.email}</td>
                  <td className="border border-gray-300">{each.indexNumber}</td>
                  <td className="border border-gray-300">{each._id}</td>
                  <td className="border border-gray-300">{each.role}</td>
                </tr>
              );
            })}
          </table>
        </section>
      </main>
    </main>
  );
}
