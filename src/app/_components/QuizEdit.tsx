import { useEffect, useState } from "react";

export const QuizEdit = ({formData, setFormData}) => {
  const [activeCase, setActiveCase] = useState(1); 

  const setTest = (input, output) => {
    for (let i = 0; i < formData.tests.length; i++) {
      if(i === activeCase-1) {
        const newTests = [...formData.tests];
        newTests[i] = {input: input, expected: output};
        setFormData({...formData, tests: newTests});
      }
    }
  }

  const setField = (name, e) => {
    switch(name) {
      case 'description':
        setFormData({...formData, prompt: e.target.value})
        return;
      case 'starter_code':
        setFormData({...formData, starterCode: e.target.value})
        return;
    }
  }

  return (
    <div className='flex full-size'>
      <div className='edit-box' style={{width: "48%", height: "100%", borderRight: "2px solid #dcdcdc"}}>
        <h3>Description</h3>
        <textarea id="description" name="description" style={{height: "100%"}} onChange={(e)=>setField('description', e)}>
          {formData.prompt}
        </textarea>
      </div>
      <div className='flex col' style={{width: "52%", height: "100%"}}>
        <div className='edit-box' style={{width: "100%", height: "50%", borderBottom: "2px solid #dcdcdc"}}>
          <div className="flex" style={{alignItems: "center"}}>
            <h3>Code</h3>
            <div style={{width: "1rem"}}></div>
            <button className={`lan-btn ${formData.language === 'js' ? 'active' : ''}`} onClick={()=>setFormData({...formData, language: 'js'})}>Javascript</button>
            <button className={`lan-btn ${formData.language === 'py' ? 'active' : ''}`} onClick={()=>setFormData({...formData, language: 'py'})}>Python</button>
          </div>
          <textarea className='flex col' id="starter_code" name="starter_code" style={{height: "100%"}} onChange={(e)=>setField('starter_code', e)}>
            {formData.starterCode}
          </textarea>
        </div>
        <div className='edit-box' style={{width: "100%", height: "50%"}}>
          <h3>Testcase</h3>
          <div className="flex" style={{width: "100%", gap: "0.5rem", alignItems: "center"}}>
            {formData.tests?.map((_, i) => <button onClick={()=>setActiveCase(i+1)} className={`case-btn ${activeCase === i+1 ? 'active' : ''}`}>Case {i+1}</button>)}
            <button style={{fontSize: "14pt", paddingBottom: "3px", boxSizing: "content-box", color: "#7d7d7d"}}>+</button>
          </div>
          <div className="flex col" >
            <span style={{color: "#696969", fontSize: "11pt"}}>Input</span>
            <input onChange={(e)=>setTest(e.target.value, formData.tests[activeCase-1].expected)} value={formData.tests[activeCase-1].input}/>
          </div>
          <div className="flex col">
            <span style={{color: "#696969", fontSize: "11pt"}}>Output</span>
            <input onChange={(e)=>setTest(formData.tests[activeCase-1].input, e.target.value)} value={formData.tests[activeCase-1].expected}/>
          </div>
        </div>
      </div>
    </div>
  )
}