import { useForm } from "react-hook-form";
import { type FormType } from "./SignUp";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useState } from "react";
import type { StatusProps } from "../../components/Status";
import Status from "../../components/Status";

export default function LogIn() {
  const route = useNavigate();
  const [Notice, setNotice] = useState<StatusProps["details"]>({
    status: "",
    statusText: "",
  });
  const [isLecturer, setIsLecturer] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>();

  const onSubmit = (data: FormType) => {
    try {
      api
        .post("/auth/student/signin", data)
        .then((response) => {
          setNotice({
            status: response.data.status,
            statusText: response.statusText,
          }),
            route("/student/submittion");
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
      {/* SIGN In PAGE */}
      <section className="flex flex-col gap-10 p-20 shadow-md">
        <article>
          {/* LOGO */}
          <div className="w-10 h-10 bg-gray-200 mb-3"></div>

          <h1 className="text-2xl font-bold">Sign In</h1>
        </article>

        <div>
          <input
            {...register(isLecturer ? "email" : "indexNumber", {
              required: true,
              minLength: 10,
            })}
            className="border-[#0a2540] w-80 border-b outline-none placeholder-[#0d9488] pb-2"
            placeholder={isLecturer ? "Email" : "Index number"}
          />
          {errors.indexNumber && (
            <div>
              <p className="text-red-500">Index number required</p>
              <p className="text-red-500">
                Index number should be at least 10 characters
              </p>
            </div>
          )}
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

        <div
          className={`${
            isLecturer ? "hidden" : "block"
          }  flex gap-1 items-center`}
        >
          <p>Log in as </p>
          <p
            onClick={() => setIsLecturer(true)}
            className="text-blue-500 cursor-pointer"
          >
            Lecturer
          </p>
        </div>

        <article className="flex justify-end gap-5">
          <button
            onClick={() => {
              isLecturer ? setIsLecturer(false) : route("/signup"), reset();
            }}
            className="bg-gray-400 h-10 w-20"
          >
            Back
          </button>

          <button type="submit" className="bg-[#0a2540] text-white h-10 w-20">
            Next
          </button>
        </article>
      </section>
    </form>
  );
}
