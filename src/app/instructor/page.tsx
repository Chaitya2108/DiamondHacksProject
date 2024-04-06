import Image from 'next/image';
import logo from './logo.png';

export default function Instructor({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{width: "100vw", height: "100vh"}}>
      <div>
        <Image
          src={logo}
          width={30}
          height={30}
          alt="logo"
        />
      </div>
      <div className="flex col" style={{width: "200px", height: "100%", borderRight: "1px solid black"}}>
        <div style={{width: "200px", height: "40px", borderBottom: "1px solid black"}}>
          Class
        </div>
        <div style={{width: "200px", height: "40px", borderBottom: "1px solid black"}}>
          Class
        </div>
        <div style={{width: "200px", height: "40px", borderBottom: "1px solid black"}}>
          Class
        </div>
      </div>
    </div>
  );
}