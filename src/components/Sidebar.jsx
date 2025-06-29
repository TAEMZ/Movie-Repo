import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/Sidebar.css"; // CSS for the sidebar

function Sidebar({
  onGenreClick,
  onPopularClick,
  onTopRatedClick,
  onUpcomingClick,
  onNowPlayingClick,
  onFavoritesClick,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi"];

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li
            className={activeDropdown === "genre" ? "active" : ""}
            onClick={() => toggleDropdown("genre")}
          >
            Genre <FontAwesomeIcon icon={faChevronDown} />
            <ul className="genre-dropdown">
              {genres.map((genre) => (
                <li key={genre} onClick={() => onGenreClick(genre)}>
                  {genre}
                </li>
              ))}
            </ul>
          </li>
          <li onClick={onPopularClick}>Popular</li>
          <li onClick={onTopRatedClick}>Top Rated</li>
          <li onClick={onUpcomingClick}>Upcoming</li>
          <li onClick={onNowPlayingClick}>Now Playing</li>
          <li onClick={onFavoritesClick}>Favorites</li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
