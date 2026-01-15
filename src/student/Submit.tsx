import { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import Status from "../../components/Status";

type SubmitType = {
  title: string;
  description: string;
  file: FileList;
  option: string;
};

export default function submittion() {
  const [displayFileName, setDisplayFileName] = useState();
  const [status, setStatus] = useState({
    status: "",
    statusText: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitType>();

  const lecturers = ["Pick a lecturer", "oswald", "oswald"];

  const onSubmit = (data: SubmitType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <Status details={status} />
      <h1 className={`text-3xl text-[#0a2540] flex justify-start font-bold`}>
        Project Proposal Submittion
      </h1>

      <section className="flex flex-col justify-center items-center gap-5 p-10">
        <div className="w-full">
          <input
            {...register("title", { required: true })}
            placeholder="Title"
            className="p-2 outline-none border border-[#0a2540] placeholder-gray h-10 w-full"
          />
          {errors.title && <p className="text-red-500">Title Required</p>}
        </div>

        <div className="w-full">
          <textarea
            {...register("description", { required: true })}
            placeholder="Description"
            className="p-2 outline-none border border-[#0a2540] placeholder-gray  mt-3 w-full"
          />
          {errors.description && (
            <p className="text-red-500">Discription Required</p>
          )}
        </div>

        <div className="w-full">
          <select
            {...register("option", { required: "Select your lecturer" })}
            className=" p-2 outline-none w-full h-12 border text-gray-400  border-[#0a2540]"
          >
            {lecturers.map((each, index) => {
              return (
                <option key={index} value={each}>
                  {each}
                </option>
              );
            })}
            {errors.option && <p className="text-red-500">Lecturer Needed</p>}
          </select>
        </div>

        <div className="w-full">
          <label
            className="flex flex-col items-center justify-center text-gray-400 border-[#0a2540] placeholder-gray h-32
          border border-dashed rounded-lg
          cursor-pointer"
          >
            <Upload className="w-8 h-8 mb-2" />

            <small className="text-sm w-full text-center">
              {displayFileName || "Click to upload a file"}
              <br />
              <small className="">PDF 2MB</small>
            </small>

            <input
              type="file"
              className="hidden"
              {...register("file", { required: true })}
              //   onChange={(e) => setDisplayFileName(e.target.files?.[0]?.name || "")}
            />
          </label>
          {errors.file && (
            <p className="text-red-500">There's no file to upload</p>
          )}
        </div>
      </section>
      <button
        type="submit"
        className="bg-[#0a2540] float-right cursor-pointer text-white h-10 w-20"
      >
        Submit
      </button>
    </form>
  );
}
