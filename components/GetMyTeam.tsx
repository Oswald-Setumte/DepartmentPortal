import { useState } from "react";
import api from "./../utils/api";
import type { StatusProps } from "../components/Status";
import Status from "../components/Status";
import { X } from "lucide-react";

type getType = {
  name: string;
  members: [
    {
      id: string;
      email: string;
      indexNumber: string;
    }
  ];
};
export default function () {
  const [colseModal, setcloseModal] = useState(false);
  const [getmembers, setMember] = useState<getType>({
    name: "",
    members: [
      {
        id: "",
        email: "",
        indexNumber: "",
      },
    ],
  });
  const [Notice, setNotice] = useState<StatusProps["details"]>({
    status: "",
    statusText: "",
  });
  const onsubmit = () => {
    try {
      api
        .get("/teams")
        .then((response) => {
          setMember({
            name: response.data.name,
            members: response.data.members,
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
  return (
    <form
      onSubmit={() => onsubmit()}
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
            />
          </article>
          <hr className="text-gray-400 mt-5" />
          <article>
            {getmembers.members.map((each, index) => {
              return (
                <div
                  key={index}
                  className="border-b flex justify-evenly border-gray-400"
                >
                  <p>{each.email}</p>-<p>{each.indexNumber}</p>
                </div>
              );
            })}
          </article>
        </section>
      </main>
    </form>
  );
}
