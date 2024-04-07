'use client';

import { TopNavbar } from "../_components/TopNavbar";
import { SideNavbar } from "../_components/SideNavbar";
import { QuizEdit } from "../_components/QuizEdit";
import { StudentEdit } from "../_components/StudentEdit"

import { CreatePost } from "~/app/_components/create-post";
// import { api } from "~/trpc/server";
import { useRouter } from "next/navigation";
import {redirect} from "next/navigation";
import React, { use, useState } from 'react';
import { FormEvent, ChangeEvent } from 'react';
import qs from 'qs';

export default function Student() {
  let formData = '{}';
  try {
    formData = localStorage.getItem('formData')
  } catch {}
  const parsed = JSON.parse(formData)
  const name = parsed.name
  console.log(name)
  return (
    <div className="flex col" style={{width: "100vw", height: "100vh"}}>
    <div className="w-screen">
      {/* api needs to pass this */}
        <TopNavbar classNum={parsed.classid} ID={name}/>
    </div>
    <div className='flex' style={{height: "100%"}}>
        <SideNavbar />     
        <StudentEdit joinCode={parsed.classid} id={parsed.pid}/>
      </div>
    </div>
    
    
  );
}
