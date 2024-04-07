'use client';

import { TopNavbar } from "../_components/TopNavbar";
import { SideNavbar } from "../_components/SideNavbar";
import { QuizContent } from "../_components/QuizContent";

export default function Instructor({
  children,
}: {
  children: React.ReactNode;
}) {
  const formData = localStorage.getItem('formData')
  const data = JSON.parse(formData)
  console.log(`data: ${data}`);

  return (
    <div className="flex col" style={{width: "100vw", height: "100vh"}}>
      <TopNavbar classNum={data['className']} ID={data['joinCode']} />
      <div className='flex' style={{height: "100%"}}>
        <SideNavbar />
        <QuizContent joinCode={data['joinCode']}/>
      </div>
    </div>
  );
}