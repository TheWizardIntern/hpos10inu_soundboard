import SoundGrid from "./SoundGrid";

const imageFolder = "/images";
const logoImage = `${imageFolder}/sonic2.png`;

export default function App() {
  return (
    <div>
      <Logo />
      <Nav />
      <SoundGrid />
    </div>
  );
}

function Nav() {
  return <nav className="nav-bar">Nav Bar</nav>;
}

function Logo() {
  return <img className="logo-image" src={logoImage} alt="Sonic" />;
}
