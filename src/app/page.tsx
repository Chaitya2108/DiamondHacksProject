'use client';

import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
// import { api } from "~/trpc/server";

import React, { useState } from 'react';

function PasswordBar() {
  return (
    <div >
      <form>
        <label>Class Key: </label>
        <input type = "text" id="password" name="password"></input>
        <label>Student Name</label>
        <input type = "text" id="fname" name="fname"></input>
        <label>PID</label>
        <input type = "text" id="pid" name="pid"></input>
      </form>
    </div>
  )
}

export default function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          New Web Clicker
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
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

          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
            <h3 className="text-center text-2xl font-bold">Instuctor</h3>
            <div className="text-lg">
              Click Here
            </div>
          </div>
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
            <h3 className="text-center text-2xl font-bold">Student</h3>
            <div onClick = {toggleVisibility} className="text-lg">
              Click Here
            </div>
          </div>
        </div>
        {isVisible && <PasswordBar />}    
      </div>
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


