import { useForm } from "react-hook-form";
import type { FormType } from "./SignUp";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useState } from "react";
import type { StatusProps } from "../../components/Status";
import Status from "../../components/Status";

export default function LecSignUP() {
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
      api.post("/auth/student/signup", data).then((res) => {
        setNotice({
          status: res.data.status,
          statusText: res.statusText,
        });
        console.log("success", res);
        res.data.status == "success" && route("/signIn");
        reset();
      });
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <main className="flex justify-center bg-[#f8fafc] items-center border h-screen">
      <Status details={Notice} />
      {/* SIGN UP PAGE FOR LECTURERS */}
      <section className="flex flex-col gap-10 p-20 shadow-md">
        <article>
          {/* LOGO */}
          <div className="w-10 h-10 bg-gray-200 mb-3"></div>

          <h1 className="text-2xl font-bold">Sign Up</h1>
        </article>

        <div>
          <input
            {...register("email", {
              required: true,
            })}
            className="border-[#0a2540] w-80 border-b outline-none placeholder-[#0d9488] pb-2"
            placeholder={"Email"}
          />

          {errors.email && <p className="text-red-500">Email required</p>}
        </div>

        <div>
          <input
            {...register("password", { required: true, minLength: 6 })}
            className="border-[#0a2540] w-80  border-b outline-none placeholder-[#0d9488] pb-2"
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
            onClick={() => route("/signup")}
            className="bg-gray-400 h-10 w-20"
          >
            Back
          </button>

          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="bg-[#0a2540] text-white h-10 w-20"
          >
            Next
          </button>
        </article>
      </section>
    </main>
  );
}
