import Image from 'next/image';
import logo from '~/images/logo.png';

export const TopNavbar = () => {
  return (
    <div className="flex" style={{borderBottom: "1px solid black"}}>
      <Image
        src={logo}
        width={30}
        height={30}
        alt="logo"
      />
      <div>
        CSE12
      </div>
    </div>
  )
}