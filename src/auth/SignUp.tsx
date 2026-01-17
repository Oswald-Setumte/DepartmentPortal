import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useState } from "react";
import Status, { type StatusProps } from "../../components/Status";

export type FormType = {
  email: string;
  password: string;
  indexNumber: string;
};

export default function SignUp() {
  const route = useNavigate();
  const [Notice, setNotice] = useState<StatusProps["details"]>({
    status: "",
    statusText: "",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>();

  const onSubmit = (data: FormType) => {
    try {
      api
        .post("/auth/student/signup", data)
        .then((response) => {
          setNotice({
            status: response.data.status,
            statusText: response.statusText,
          });
          localStorage.setItem("token", response.data.token);
          response.data.status == "success" && route("/student/createteam");
          reset();
        })
        .catch((err) => {
          setNotice({
            status: err.response.data.status,
            statusText: err.response.data.message,
          });
        });
    } catch (error) {}
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center bg-[#f8fafc] items-center border h-screen"
    >
      <Status details={Notice} />
      {/* SIGN UP PAGE */}
      <section className="flex flex-col gap-10 p-20 shadow-md">
        <article>
          {/* LOGO */}
          <div className="w-10 h-10 bg-gray-200 mb-3"></div>

          <h1 className="text-2xl font-bold">Sign Up</h1>
        </article>

        <div>
          <input
            {...register("email", { required: true })}
            className="border-[#0a2540] w-80 border-b outline-none placeholder-[#0d9488] pb-2 "
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email required</p>}
        </div>

        <div>
          <input
            {...register("indexNumber", { required: true, minLength: 10 })}
            className="border-[#0a2540] w-80 border-b outline-none placeholder-[#0d9488] pb-2"
            placeholder="Index number"
          />
          {errors.indexNumber && (
            <div>
              <p className="text-red-500">Index number required</p>
              <p className="text-red-500">
                Index number should be at least 10 characters
              </p>
            </div>
          )}
        </div>

        <div>
          <input
            {...register("password", { required: true })}
            className="border-[#0a2540] w-80 border-b outline-none placeholder-[#0d9488] pb-2"
            placeholder="Password"
          />
          {errors.password && (
            <div>
              <p className="text-red-500">Password required</p>
              <p className="text-red-500">
                Password should be at least 6 characters
              </p>
            </div>
          )}
        </div>

        <article className="flex justify-end gap-5">
          <button
            onClick={() => route("/")}
            className="bg-gray-400 cursor-pointer h-10 w-20"
          >
            Back
          </button>

          <button
            type="submit"
            className="bg-[#0a2540] cursor-pointer text-white h-10 w-20"
          >
            Next
          </button>
        </article>
      </section>
    </form>
  );
}
