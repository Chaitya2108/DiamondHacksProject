import Image from 'next/image';
import logo from '~/images/logo.png';

export const TopNavbar = (props) => {
  return (
    <div className="flex" style={{borderBottom: "2px solid #dcdcdc", height: "3rem", padding: "0.2rem", alignItems: "center", gap: "0.5rem", position: "relative"}}>
      <Image
        src={logo}
        width={40}
        height={40}
        alt="logo"
      />
      <h1>
        {props.classNum}
      </h1>
      <h1 className="absolute right-5">
        {props.ID}
      </h1>
    </div>
  )
}