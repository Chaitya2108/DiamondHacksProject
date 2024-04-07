export const StudentEdit = (props) => {
    return (
      <div className="flex col full-size">
          <div className="flex" style={{width: "100%", height: "3rem", borderBottom: "2px solid #dcdcdc", alignItems: "center", padding: "1rem"}}>
            {/* Don't need a problem number but should come from API */}
            <h2>Problem 6</h2>
            {/* <button className="btn" style={{marginLeft: "39.5%"}}>Publish</button> */}
          </div>
          <div className='flex full-size'>
            <div className='edit-box' style={{width: "40%", height: "100%", borderRight: "2px solid #dcdcdc"}}>
              <h3>Description</h3>
              {/* Description from the API */}
              <div id="w3review" style={{height: "100%"}}>
                Please implement a function that calculates the first n Fibonacci numbers using your toes and you shall receive A++.
                {props.description}
              </div>
            </div>
            <div className='flex col' style={{width: "60%", height: "100%"}}>
              <div className='edit-box' style={{width: "100%", height: "60%", borderBottom: "2px solid #dcdcdc"}}>
                <h3>Code</h3>
                <textarea className='flex col' id="w3review" name="w3review" style={{height: "100%"}}>
                    {/* Starter code needs to come from API */}
                    {/* {props.starterCode} */}
                </textarea>
              </div>
              <div className='edit-box' style={{width: "100%", height: "40%"}}>
                {/* <h3>Testcase</h3>
                <div className="flex" style={{width: "100%", gap: "0.5rem", alignItems: "center"}}>
                  <button className="case-btn active">Case 1</button>
                  <button className="case-btn">Case 2</button>
                  <button style={{fontSize: "14pt", paddingBottom: "3px", boxSizing: "content-box", color: "#7d7d7d"}}>+</button>
                </div>
                <div className="flex col" >
                  <span style={{color: "#696969"}}>Input</span>
                  <input />
                </div>
                <div className="flex col">
                  <span style={{color: "#696969"}}>Output</span>
                  <input />
                </div> */}
                <h3>Test Cases</h3>
                {/* If no test cases, then */}
                <p>No Test Cases Yet</p>
                {/* else */}
                {/** go through all test cases one by one */}
                
                <form style={{position: "relative", width: "100%", height: "100%"}}>
                <button className=" absolute right-0 bottom-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Submit
                </button>   
                </form>
              </div>
            </div>
          </div>
        </div>
    )
  }