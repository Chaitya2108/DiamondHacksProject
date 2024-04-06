import { TopNavbar } from "../_components/TopNavbar";
import { SideNavbar } from "../_components/SideNavbar";
import { QuizEdit } from "../_components/QuizEdit";

export default function Student({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex col" style={{width: "100vw", height: "100vh"}}>
    <div className="w-screen">
        <TopNavbar />
    </div>
    <div className='flex' style={{height: "100%"}}>
        <div style={{width: "40%"}}>
            <SideNavbar />
        </div>     
        <QuizEdit />
      </div>
    </div>
    
    
  );
}