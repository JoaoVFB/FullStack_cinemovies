import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import iconStar from "../assets/star.png";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="home-link">
          <img src={Logo} className="logo" alt="logo" />
          <h1>Cine Movies</h1>
        </Link>
      </div>

      <div className="header-right">
        <Link to="/favoritos" className="favoritos-link">
          <img src={iconStar} alt="StarIcon" className="star-icon" />
          <h3 className="favoritos">Favoritos</h3>
        </Link>
      </div>
    </header>
  );
}

export default Header;
