'use client'

import { useState } from "react"
import { QuizEdit } from "./QuizEdit"
import { QuizResult } from "./QuizResult";

export const QuizContent = () => {
  const [isShowResult, setShowResult] = useState(false);

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
          <button className="btn">Clear</button>
          <button className="btn">Publish</button>
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
      {!isShowResult ? <QuizEdit /> : <QuizResult />}
    </div>
  )
}