import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  useEffect(() => {
    const queryString = window.location.search;
    if (!queryString) {
      return;
    }
    const urlParams = new URLSearchParams(queryString);

    const spotifyAccessToken = urlParams.get("access_token");
    const spotifyRefreshToken = urlParams.get("refresh_token");
    const spotifyExpireTime = urlParams.get("expires_in");

    localStorage.setItem("spotifyAccessToken", spotifyAccessToken);
    localStorage.setItem("spotifyRefreshToken", spotifyRefreshToken);
    localStorage.setItem("spotifyExpireTime", spotifyExpireTime);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      return;
    }
    const youtubeAccessToken = hash
      .substring(1)
      .split("&")
      .find((elem) => elem.startsWith("access_token"))
      .split("=")[1];
    localStorage.setItem("youtubeAccessToken", youtubeAccessToken);
  }, []);

  return (
    <div className="home">
      <div>
        <div className="homepage-first-heading">
          <p class="text-4xl text-gray-900 dark:text-white text">
            Export your playlist from Youtube Music to Spotify
          </p>
        </div>
        <div className="homepage-first-heading">
          <p class="text-2xl text-gray-900 dark:text-white text">
            First connect both of your account using the below login buttons
            then choose Youtube to Spotify.
          </p>
        </div>
        <div className="login-buttons">
          <a href="https://music-backend-five.vercel.app/spotify/login">
            <button
              type="button"
              class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 home-button"
              style={{ marginRight: "2rem" }}
            >
              Login To Spotify
            </button>
          </a>
          <a href="https://music-backend-five.vercel.app/youtube/login">
            <button
              type="button"
              class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 home-button"
            >
              Login To Youtube
            </button>
          </a>
        </div>
        <div className="playlistLoad-button">
          <Link to="/youtube">
            <button
              type="button"
              class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 home-button"
            >
              Youtube to Spotify
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
