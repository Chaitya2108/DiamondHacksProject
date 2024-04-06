import Image from 'next/image';
import logo from '~/images/logo.png';

export const TopNavbar = () => {
  return (
    <div className="flex" style={{borderBottom: "1px solid black", height: "3rem", padding: "0.2rem", alignItems: "center", gap: "0.5rem"}}>
      <Image
        src={logo}
        width={40}
        height={40}
        alt="logo"
      />
      <h1>
        CSE12
      </h1>
    </div>
  )
}