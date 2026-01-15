import { useForm } from "react-hook-form";
import api from "../../utils/api";
import type { StatusProps } from "../../components/Status";
import { useState } from "react";
import Status from "../../components/Status";

type submitType = {
  name: string;
};

export default function Team() {
  const [Notice, setNotice] = useState<StatusProps["details"]>({
    status: "",
    statusText: "",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<submitType>();

  const onsubmit = (data: submitType) => {
    try {
      api
        .post("/teams", data)
        .then((response) => {
          setNotice({
            status: response.status.toString(),
            statusText: response.data.name,
          });
          reset();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="grid justify-center shadow-md border h-50  p-8"
    >
      <Status details={Notice} />
      <p className="text-3xl font-bold">Create a Team</p>
      <div className="flex items-center gap-2">
        <div>
          <input
            {...register("name", { required: true })}
            placeholder="Enter team name"
            className="border-[#0a2540] w-80 border-b outline-none placeholder-[#0d9488] pb-2"
          />
          {errors.name && <p className="text-red-500">Team name required</p>}
        </div>

        <button
          type="submit"
          className="bg-[#0a2540] cursor-pointer text-white h-10 w-20"
        >
          Create
        </button>
      </div>
    </form>
  );
}
