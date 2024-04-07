export const QuizEdit = () => {
  return (
    <div className='flex full-size'>
      <div className='edit-box' style={{width: "48%", height: "100%", borderRight: "2px solid #dcdcdc"}}>
        <h3>Description</h3>
        <textarea id="w3review" name="w3review" style={{height: "100%"}}>
          Please implement a function that calculates the first n Fibonacci numbers using your toes and you shall receive A++.
        </textarea>
      </div>
      <div className='flex col' style={{width: "52%", height: "100%"}}>
        <div className='edit-box' style={{width: "100%", height: "50%", borderBottom: "2px solid #dcdcdc"}}>
          <div className="flex" style={{alignItems: "center"}}>
            <h3>Code</h3>
            <div style={{width: "1rem"}}></div>
            <button className="lan-btn active">Javascript</button>
            <button className="lan-btn">Python</button>
          </div>
          <textarea className='flex col' id="w3review" name="w3review" style={{height: "100%"}}>
            {"/**\n * @param {number} n\n * @return {number}\n */ \nvar Fibonacci = function(n) {\n    \n};"}
          </textarea>
        </div>
        <div className='edit-box' style={{width: "100%", height: "50%"}}>
          <h3>Testcase</h3>
          <div className="flex" style={{width: "100%", gap: "0.5rem", alignItems: "center"}}>
            <button className="case-btn active">Case 1</button>
            <button className="case-btn">Case 2</button>
            <button style={{fontSize: "14pt", paddingBottom: "3px", boxSizing: "content-box", color: "#7d7d7d"}}>+</button>
          </div>
          <div className="flex col" >
            <span style={{color: "#696969", fontSize: "11pt"}}>Input</span>
            <input />
          </div>
          <div className="flex col">
            <span style={{color: "#696969", fontSize: "11pt"}}>Output</span>
            <input />
          </div>
        </div>
      </div>
    </div>
  )
}