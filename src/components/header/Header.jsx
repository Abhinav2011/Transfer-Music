import React from "react";
import youtube from "../../assets/youtube.svg";
import spotify from "../../assets/spotify.svg";
const Header = () => {
  return (
    <div fluid className="header">
      <div>
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl header-h1">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Transfer Music
          </span>{" "}
        </h1>
      </div>
      <div className="heading-text">
        <div>
          <img src={youtube} className="app-icons"></img>
        </div>
        <div>TO</div>
        <div>
          <img src={spotify} className="app-icons"></img>
        </div>
      </div>
    </div>
  );
};

export default Header;
