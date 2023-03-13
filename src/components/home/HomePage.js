import React, { useEffect } from "react";
import { Button, Divider, Grid, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  //TODO: handle login to spotify and youtube
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
      <h1>Export your playlist from Spotify to Yotube or Vice Versa</h1>
      <p>
        First connect both of your account using the below login buttons then
        choose one of the options provided.
      </p>
      <a href="http://localhost:8080/spotify/login">
        <Button>Login to Spotify</Button>
      </a>
      <a href="http://localhost:8080/youtube/login">
        <Button>Login to YouTube</Button>
      </a>
      <div>
        <Segment placeholder>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              <p>Export your playlists from Spotify to YouTube</p>
              <Link to="/spotify">
                <Button>Spotify to YouTube</Button>
              </Link>
            </Grid.Column>

            <Grid.Column verticalAlign="middle">
              <p>Export your playlists from YouTube to Spotify</p>
              <Link to="/youtube">
                <Button> YouTube to Spotify</Button>
              </Link>
            </Grid.Column>
          </Grid>

          <Divider vertical>Or</Divider>
        </Segment>
      </div>
    </div>
  );
};

export default HomePage;
