'use client';

import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
// import { api } from "~/trpc/server";
import { useRouter } from "next/navigation";
import {redirect} from "next/navigation";
import React, { use, useState } from 'react';
import { type FormEvent, ChangeEvent } from 'react';
import qs from 'qs';
import { api } from "~/trpc/react";


function InstBar() {
  const [formData, setFormData] = useState({
    'username': ''
  });
  const router = useRouter();
  
  
  const handleChange = (e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: fieldValue
    }))
  }

  const createInstructorMutate = api.instructor.create.useMutation()

  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData)
    const queryString = qs.stringify(formData);
    const joinCode = await createInstructorMutate.mutateAsync({ name: formData.username })
    localStorage.setItem('formData',JSON.stringify({ username: formData.username, joinCode }))
    router.push('/instructor');
  }

  return(
<div className="w-full max-w-xs">
  <form  onSubmit = {(event) => handleSubmit(event)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Class Name
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Class Name" onChange={handleChange}></input>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
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
    'classid': '',
    'name': '',
    'pid': ''
  })

  const router = useRouter();

  const handleChange = (e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value

    setFormData(prevState => ({
      ...prevState,
      [fieldName]: fieldValue
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    localStorage.setItem('formData',JSON.stringify(formData))
    router.push('/student')
  }

  return (
    <div className="w-full max-w-xs">
  <form  onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Class ID
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="classid" name = "classid" type="text" onChange={handleChange} placeholder="Class ID"></input>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Full Name
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" onChange={handleChange} placeholder="Full Name"></input>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        PID
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="pid" name="pid" type="text" onChange={handleChange} placeholder="PID"></input>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Submit
      </button>    
    </div>
  </form>
</div>
  )
}



export default function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const [studentIsVisible, setStudentIsVisible] = useState(false);
  const [profIsVisible, setProfIsVisible] = useState(false);

  const toggleStudentVisibility = () => {
    setStudentIsVisible(!studentIsVisible);
  };
  const toggleProfVisibility = () => {
    setProfIsVisible(!profIsVisible);
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
            <div onClick = {toggleProfVisibility} className="text-lg">
              Click Here
            </div>
          </div>
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
            <h3 className="text-center text-2xl font-bold">Student</h3>
            <div onClick = {toggleStudentVisibility} className="text-lg">
              Click Here
            </div>
          </div>
        </div>
        {profIsVisible && <InstBar />}
        {studentIsVisible && <PasswordBar />}    
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


