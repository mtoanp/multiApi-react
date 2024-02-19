import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ThemeControl from "../../components/ThemeControl/ThemeControl";

import "./NavBar.scss";

function NavBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, setIsAuthenticated, userName } = useAuth();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
    setSearchQuery("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
      setSearchQuery("");
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
            <div className="nav-logo">MultiAPI</div>
          </div>
        </Link>

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
            value={searchQuery}
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
