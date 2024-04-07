'use client'

import { useEffect, useState } from "react"
import { QuizEdit } from "./QuizEdit"
import { QuizResult } from "./QuizResult";
import { api } from "~/trpc/react";

export const QuizContent = ({joinCode}) => {
  const [isShowResult, setShowResult] = useState(false);
  const assignInstructorMutate = api.instructor.assign.useMutation();
  const clearInstructorMutate = api.instructor.clear.useMutation();
  const [formData, setFormData] = useState({
    joinCode: joinCode,
    prompt: '',
    starterCode: '',
    language: 'js',
    tests: [
      {input: '', expected: ''},
      {input: '', expected: ''},
    ]
  });

  useEffect(() => {
    console.log(`formData: ${JSON.stringify(formData)}`)
  }, [formData])

  const publish = async () => {
    await assignInstructorMutate.mutateAsync({ 
      joinCode: joinCode,
      prompt: formData.prompt,
      starterCode: formData.starterCode,
      language: formData.language,
      tests: formData.tests,
    })
  }

  const clear = async () => {
    await clearInstructorMutate.mutateAsync({joinCode: joinCode});
    setFormData(
      {
        joinCode: joinCode,
        prompt: '',
        starterCode: '',
        language: 'js',
        tests: [
          {input: '', expected: ''},
          {input: '', expected: ''},
        ]
      }
    )
  }

  const ActionButtons = () => {
    if(isShowResult) {
      return (
        <>
          <div style={{width: "27.4rem", height: "100%"}}/>
          <button className="btn" onClick={()=>setShowResult(false)}>Back</button>
        </>
      )
    } else {
      return (
        <>
          <div style={{width: "21.5rem", height: "100%"}}/>
          <button className="btn" onClick={()=>clear()}>Clear</button>
          <button className="btn" onClick={()=>publish()}>Publish</button>
          <button className="btn" onClick={()=>setShowResult(true)}>Result</button>
        </>
      )
    }
  }

  return (
    <div className="flex col full-size">
      <div className="flex" style={{width: "100%", height: "3rem", borderBottom: "2px solid #dcdcdc", alignItems: "center", padding: "1rem", gap: "1rem"}}>
        <h2>Problem 6</h2>
        <ActionButtons />
      </div>
      {!isShowResult ? <QuizEdit formData={formData} setFormData={(v)=>setFormData(v)} /> : <QuizResult />}
    </div>
  )
}