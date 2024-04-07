import { TopNavbar } from "../_components/TopNavbar";
import { SideNavbar } from "../_components/SideNavbar";
import { QuizContent } from "../_components/QuizContent";

export default function Instructor({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex col" style={{width: "100vw", height: "100vh"}}>
      <TopNavbar />
      <div className='flex' style={{height: "100%"}}>
        <SideNavbar />
        <QuizContent />
      </div>
    </div>
  );
}