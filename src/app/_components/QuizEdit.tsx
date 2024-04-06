export const QuizEdit = () => {
  return (
    <div className="flex col" style={{width: "100%", height: "100%"}}>
        <div className="flex col" style={{width: "100%", height: "40px", borderBottom: "1px solid black"}}><h3>Problem 6</h3></div>
        <div className='flex' style={{width: "100%", height: "100%"}}>
          <div className='flex col' style={{width: "50%", height: "100%", borderRight: "1px solid black"}}>
            <h3>Description</h3>
            <textarea id="w3review" name="w3review" style={{height: "100%", backgroundColor: "#f5f5f5"}}>
              Please implement a function that calculates the first n Fibonacci numbers using your toes and you shall receive A++.
            </textarea>
          </div>
          <div className='flex col' style={{width: "50%", height: "100%", borderRight: "1px solid black"}}>
            <div className='flex col' style={{width: "100%", height: "50%", borderBottom: "1px solid black"}}>
              <h3>Code</h3>
              <textarea className='flex col' id="w3review" name="w3review" style={{height: "100%", backgroundColor: "#f5f5f5"}}>
                {"/**\n * @param {number} n\n * @return {number}\n */ \nvar Fibonacci = function(n) {\n    \n};"}
              </textarea>
            </div>
            <div className='flex col' style={{width: "100%", height: "50%"}}>
              <h3>Testcase</h3>
              <div>
                Input: <input style={{backgroundColor: "#f5f5f5"}}/>
              </div>
              <div>
                Output: <input style={{backgroundColor: "#f5f5f5"}}/>
              </div>
              
            </div>
          </div>
        </div>
      </div>
  )
}