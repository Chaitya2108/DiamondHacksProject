"use client";

import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
// import { api } from "~/trpc/server";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import React, { use, useState } from "react";
import { type FormEvent, ChangeEvent } from "react";
import qs from "qs";
import { api } from "~/trpc/react";
import { AnimatePresence, motion } from "framer-motion";

function InstBar() {
  const [formData, setFormData] = useState({
    username: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const createInstructorMutate = api.instructor.create.useMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    const queryString = qs.stringify(formData);
    const joinCode = await createInstructorMutate.mutateAsync({
      name: formData.classid,
    });
    console.log(`formData.username: ${formData.username}`);
    localStorage.setItem(
      "formData",
      JSON.stringify({ className: formData.classid, joinCode: joinCode }),
    );
    router.push("/instructor");
  };

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="mb-4 rounded bg-white/30 px-8 pb-8 pt-6 shadow-md"
      >
        {createInstructorMutate.isError && (
          <div className="mb-4 rounded-lg border border-2 border-red-500 px-4 py-2 text-red-800">
            Failed to create class
          </div>
        )}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Class Name
          </label>
          <input
            name="classid"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Class Name"
            onChange={handleChange}
          ></input>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-purple-600 px-4 py-2 font-bold text-white hover:bg-purple-700 focus:outline-none"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

function PasswordBar() {
  // const router = useRouter();

  // const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   router.push('/student')
  // }
  const [formData, setFormData] = useState({
    classid: "",
    name: "",
    pid: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const joinStudentMutate = api.student.join.useMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await joinStudentMutate.mutateAsync({
        name: formData.name,
        joinCode: formData.classid,
        id: formData.pid,
      });
    } catch (e) {
      return;
    }
    localStorage.setItem("formData", JSON.stringify(formData));
    router.push("/student");
  };

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-white/40 px-8 pb-8 pt-6 shadow-md"
      >
        {joinStudentMutate.isError && (
          <div className="mb-4 rounded-lg border border-2 border-red-500 px-4 py-2 text-red-800">
            {joinStudentMutate.error.message}
          </div>
        )}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Class ID
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="classid"
            name="classid"
            type="text"
            onChange={handleChange}
            placeholder="Class ID"
          ></input>
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Full Name
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            placeholder="Full Name"
          ></input>
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            PID
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="pid"
            name="pid"
            type="text"
            onChange={handleChange}
            placeholder="PID"
          ></input>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-purple-600 px-4 py-2 font-bold text-white hover:bg-purple-700 focus:outline-none"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Home() {
  const [state, setState] = useState<"none" | "prof" | "student">("none");

  const toggleStudentVisibility = () => {
    if (state === "student") {
      setState("none");
      return;
    }
    setState("student");
  };
  const toggleProfVisibility = () => {
    if (state === "prof") {
      setState("none");
      return;
    }
    setState("prof");
  };

  const elems = [
    {
      component: (
        <>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Codalize
          </h1>
          <h2 className="mt-2 text-center text-2xl font-normal tracking-wide">
            An interactive classroom coding experience
          </h2>
        </>
      ),
      key: "header",
    },
    {
      component: (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <div
              onClick={toggleProfVisibility}
              className="w-xs flex max-w-xs cursor-pointer flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            >
              <h3 className="text-center text-2xl font-bold">Instuctor</h3>
              <div className="text-center text-lg">Click Here</div>
            </div>
            <div
              onClick={toggleStudentVisibility}
              className="flex max-w-xs cursor-pointer flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            >
              <h3 className="text-center text-2xl font-bold">Student</h3>
              <div className="text-center text-lg">Click Here</div>
            </div>
          </div>
        </>
      ),
      key: "buttons",
    },
  ];

  if (state === "prof") {
    elems.push({ component: <InstBar />, key: "prof" });
  } else if (state === "student") {
    elems.push({ component: <PasswordBar />, key: "student" });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#b989fd] to-[#a5a7d4] text-zinc-800">
      <motion.ul
        layout
        layoutId="list"
        className="container flex flex-col-reverse items-center justify-center gap-12 px-4 py-16"
      >
        <AnimatePresence>
          {elems.reverse().map((elem) => (
            <motion.li
              initial={{ y: -500, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5000, visibility: "hidden", position: "absolute" }}
              key={elem.key}
            >
              {elem.component}
            </motion.li>
          ))}
          {/* <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-center text-2xl font-bold">Instuctor</h3>
            <div className="text-lg">
              Click Here
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-center text-2xl font-bold">Student</h3>
            <div onClick = {toggleVisibility} className="text-lg">
              Click Here
            </div>
          </Link> */}
        </AnimatePresence>
      </motion.ul>
    </main>
  );
}

// async function CrudShowcase() {
//   const latestPost = await api.post.getLatest();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
