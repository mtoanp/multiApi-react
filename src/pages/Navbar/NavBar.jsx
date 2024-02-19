import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/giphy.gif";
import { useAuth } from "../../contexts/AuthContext";
import ThemeControl from "../../components/ThemeControl/ThemeControl";

import "./NavBar.scss";

function NavBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, setIsAuthenticated, userName } = useAuth();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
    setSearchTerm("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
      setSearchTerm("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  const backgroundImage = "../../src/assets/images/sun.jpg";
  return (
    <nav
      className="navbar navbar-expand-xl"
      style={{ background: `center url(${backgroundImage})` }}>
      {/* <nav className="navbar navbar-expand-xl" style={{ background: `url(${backgroundImage}) !important` }}> */}
      {/* // <nav className="navbar navbar-expand-xl" style={{ background: "url('../../assets/images/sun.jpg') !important" }}> */}
      <div className="nav-l">
        <Link to="/">
          <div className="logo d-none d-xl-inline">
            <img src={Logo} alt="MultiAPI Logo" />
          </div>
        </Link>
        <div className="nav-logo">MultiAPI</div>
        <ThemeControl />
      </div>

      <ul
        className="nav-mid collapse navbar-collapse"
        id="navbarSupportedContent">
        <div className="links">
          {isAuthenticated && <span>Bonjour, {userName}!</span>}
          <li className="nav-item">
            <Link to="/">Accueil</Link>
          </li>
          <li className="nav-item">
            <Link to="/about">A propos</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="nav-item">
            <Link to="/chat">Chat</Link>
          </li>
          <li className="nav-item">
            {!isAuthenticated && (
              <Link to="/inscription" className="text-success">
                Inscription
              </Link>
            )}
          </li>
          <li className="nav-item">
            {!isAuthenticated && (
              <Link to="/connexion" className="text-success">
                Connexion
              </Link>
            )}
          </li>
          <li className="nav-item">
            {isAuthenticated && (
              <a onClick={handleLogout} className="btn text-danger">
                Déconnexion
              </a>
            )}
          </li>
        </div>
      </ul>

      <div className="nav-r">
        <div className="search">
          <input
            type="text"
            placeholder="Rechercher une ville..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearch}>
            <i className="bi bi-search"></i>
          </button>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
