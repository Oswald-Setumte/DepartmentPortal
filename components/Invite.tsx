import { useState } from "react";
import Status, { type StatusProps } from "./Status";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import api from "../utils/api";

type submit = {
  email: string;
};

export default function Invite() {
  const [closeInvite, setCloseInvite] = useState(false);
  const [status, setStatus] = useState<StatusProps["details"]>({
    status: "",
    statusText: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<submit>();

  const token = localStorage.getItem("token");

  const onsubmit = (data: submit) => {
    console.log(data);
    api
      .post("/teams/invite", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setStatus({
          status: response.data.status.toString(),
          statusText: response.data.message,
        });
      });
  };
  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className={`${
        closeInvite && "hidden"
      } grid shadow-md border  border-gray-400 p-5`}
    >
      <Status details={status} />
      <main>
        <section>
          <article className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Invite a Member</h1>
            <X
              size={20}
              onClick={() => {
                setCloseInvite(true);
              }}
              className="cursor-pointer"
            />
          </article>
          <hr className="text-gray-400 mt-5" />
          <article className="flex items-center gap-2 mt-8 justify-center">
            <div>
              <input
                type="email"
                {...register("email", {
                  required: true,
                })}
                placeholder="Add member email"
                className="border-[#0a2540] w-80 border-b outline-none placeholder-[#0d9488] pb-2"
              />
              {errors.email && (
                <p className="text-red-500">Member email required</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#0a2540] cursor-pointer text-white h-10 w-20"
            >
              Invite
            </button>
          </article>
        </section>
      </main>
    </form>
  );
}
