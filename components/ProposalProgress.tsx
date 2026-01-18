import { useState } from "react";
import { progress } from "../constant/data";

export default function ProposalProgress() {
  const [id, setId] = useState<number>(0);

  return (
    <main className="">
      <h1 className="text-5xl font-extrabold mb-15">Proposal Progress</h1>
      <div className="flex justify-evenly relative items-center font-extrabold text-gray-600 text-2xl">
        <div className="absolute top-[17%] w-[80%] mr-3 bg-gray-400 overflow-hidden rounded-full">
          <div
            className={` ${
              progress[id] && `bg-green-400 ${progress[id].w}`
            } bg-gray-400  size-3`}
          ></div>
        </div>

        {progress.map((each, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center mb-15"
            >
              <div
                className={`size-20 rounded-full ${
                  index === id && "bg-green-400 text-black"
                } ${
                  index < id && "bg-green-400"
                } bg-gray-400 flex items-center justify-center`}
              >
                <div className="size-15 bg-white rounded-full flex items-center justify-center">
                  <div
                    className={`size-10 ${index === id && "bg-green-400"} ${
                      index < id && "bg-green-400"
                    } bg-gray-400 rounded-full`}
                  ></div>
                </div>
              </div>
              <p className={`mt-5`}>{each.name}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
