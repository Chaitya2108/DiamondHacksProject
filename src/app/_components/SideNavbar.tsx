export const SideNavbar = () => {
  return (
    <div className="flex col" style={{width: "200px", height: "100%", borderRight: "2px solid #dcdcdc", backgroundColor: "#f5f5f5"}}>
      <div className="flex" style={{width: "100%", borderBottom: "1px solid #dcdcdc", alignItems: "center", padding: "0.6rem", fontSize: "12pt", color: "#505050", fontWeight: "450"}}>
        Class
      </div>
      <div className="flex" style={{width: "100%", borderBottom: "1px solid #dcdcdc", alignItems: "center", padding: "0.6rem", fontSize: "12pt", color: "#505050", fontWeight: "450"}}>
        Problems
      </div>
      <div className="flex" style={{width: "100%", borderBottom: "1px solid #dcdcdc", alignItems: "center", padding: "0.6rem", fontSize: "12pt", color: "#505050", fontWeight: "450"}}>
        Students
      </div>
    </div>
  )
}